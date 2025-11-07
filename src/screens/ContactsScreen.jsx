import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Modal,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import * as Contacts from "expo-contacts";
import { PhoneTypeSelectModal } from "../components/PhoneTypeSelectModal";

const groupContacts = (contacts) => {
  const grouped = contacts.reduce((acc, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  return Object.keys(grouped)
    .sort()
    .map((key) => ({
      title: key,
      data: grouped[key],
    }));
};

const ContactItem = ({ name, phoneNumber, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.contactItem}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{name[0]}</Text>
    </View>
    <View style={styles.contactInfo}>
      <Text style={styles.contactName}>{name}</Text>
      <Text style={styles.contactPhone}>{phoneNumber}</Text>
    </View>
  </TouchableOpacity>
);

export function ContactsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneTypeModalVisible, setPhoneTypeModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [callDelay, setCallDelay] = useState(5);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 연락처 권한 요청 및 로드
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          // 연락처 데이터를 앱에서 사용할 형식으로 변환
          const formattedContacts = data
            .filter(
              (contact) =>
                contact.phoneNumbers && contact.phoneNumbers.length > 0
            )
            .map((contact) => ({
              id: contact.id,
              name: contact.name || "이름 없음",
              phoneNumber: contact.phoneNumbers[0]?.number || "",
            }));
          setContacts(formattedContacts);
        }
      } else {
        Alert.alert(
          "권한 필요",
          "연락처 접근 권한이 필요합니다. 설정에서 권한을 허용해주세요.",
          [{ text: "확인" }]
        );
      }
      setLoading(false);
    })();
  }, []);

  const filteredContacts = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lowerCaseQuery) ||
        contact.phoneNumber.includes(lowerCaseQuery)
    );
    return groupContacts(filtered);
  }, [searchQuery, contacts]);

  const handleContactPress = (contact) => {
    // 연락처를 선택하고 폰 타입 선택 모달 열기
    setSelectedContact(contact);
    setPhoneTypeModalVisible(true);
  };

  const handlePhoneTypeSelect = (phoneType) => {
    setPhoneTypeModalVisible(false);

    if (!selectedContact) return;

    // 예약 알림
    Alert.alert(
      "가짜 전화 예약됨",
      `${callDelay}초 후에 ${selectedContact.name}(${selectedContact.phoneNumber})로부터 전화가 옵니다.`,
      [{ text: "확인" }]
    );

    // 설정된 시간 후에 전화 화면으로 이동
    setTimeout(() => {
      if (phoneType === "iphone") {
        navigation.navigate("IphoneCall", {
          callerName: selectedContact.name,
          callerNumber: selectedContact.phoneNumber,
        });
      } else if (phoneType === "galaxy") {
        // 갤럭시 화면은 아직 구현되지 않았으므로 임시 화면으로 이동
        navigation.navigate("Incoming", {
          scenario: {
            name: selectedContact.name,
            phoneNumber: selectedContact.phoneNumber,
          },
          from: "Contacts",
        });
      }
    }, callDelay * 1000);
  };

  // 로딩 중일 때
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>연락처를 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>연락처</Text>
        <View style={styles.settingsContainer}>
          <Text style={styles.delayText}>{`${Math.floor(callDelay / 60)}분 ${
            callDelay % 60
          }초`}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.settingsButton}>설정</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="검색"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {contacts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>연락처가 없습니다</Text>
        </View>
      ) : (
        <SectionList
          sections={filteredContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ContactItem {...item} onPress={() => handleContactPress(item)} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
      {/* 시간 설정 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              몇 초 뒤에 전화가 울릴지 설정하세요
            </Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              onChangeText={(text) => setCallDelay(parseInt(text, 10) || 0)}
              value={String(callDelay)}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>저장</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 폰 타입 선택 모달 */}
      <PhoneTypeSelectModal
        visible={phoneTypeModalVisible}
        onClose={() => setPhoneTypeModalVisible(false)}
        onSelectPhoneType={handlePhoneTypeSelect}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === "ios" ? "#F0F0F0" : "#FFFFFF",
  },
  header: {
    backgroundColor: Platform.OS === "ios" ? "#F7F7F7" : "#FFFFFF",
    padding: 16,
    borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
    borderBottomColor: "#CCCCCC",
    elevation: Platform.OS === "android" ? 4 : 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: Platform.OS === "ios" ? 34 : 24,
    fontWeight: "bold",
    color: "#000000",
  },
  settingsButton: {
    fontSize: 16,
    color: "#007AFF",
    marginLeft: 10,
  },
  settingsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  delayText: {
    fontSize: 16,
    color: "#8E8E93",
  },
  searchContainer: {
    padding: Platform.OS === "ios" ? 8 : 16,
    backgroundColor: Platform.OS === "ios" ? "#F7F7F7" : "#FFFFFF",
  },
  searchInput: {
    backgroundColor: Platform.OS === "ios" ? "#E0E0E6" : "#F0F0F0",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: Platform.OS === "ios" ? "#F0F0F0" : "#F5F5F5",
    color: "#8E8E93",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#CCCCCC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 17,
    color: "#000000",
  },
  contactPhone: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginLeft: 80, // Avatar width + margin
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
  modalInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: 100,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#8E8E93",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#8E8E93",
  },
});
