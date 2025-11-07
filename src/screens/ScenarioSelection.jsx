import React, { useState, useEffect } from "react";
import { View, Image, Pressable, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";
import { useNavigation } from "@react-navigation/native";
import CustomScenarioModal from "../components/CustomScenarioModal";
import * as Location from "expo-location";

const SCENARIOS = [
  {
    id: "dinner",
    title: "회식",
    name: "엄마",
    phoneNumber: "010-1234-5678",
    image: require("../assets/images/dinner.jpg"),
    ringtone: require("../assets/street.mp3"),
  },
  {
    id: "blind_date",
    title: "소개팅",
    name: "인사팀 민재홍 주임님",
    phoneNumber: "010-1223-4567",
    image: require("../assets/images/blind_date.png"),
    ringtone: require("../assets/street.mp3"),
  },
  {
    id: "followed",
    title: "밤에 누가 쫓아올 때",
    image: require("../assets/images/followed.png"),
    name: "엄마",
    phoneNumber: "010-1234-5678",
    ringtone: require("../assets/street.mp3"),
  },
  {
    id: "unwanted_approach",
    title: "번호 물어볼 때",
    name: "애기❤️",
    phoneNumber: "010-1234-5678",
    image: require("../assets/images/unwanted_approach.png"),
    ringtone: require("../assets/boyfriend.mp3"),
  },
  {
    id: "date_excuse",
    title: "데이트 중",
    name: "아빠",
    phoneNumber: "010-1234-5678",
    image: require("../assets/images/date_excuse.png"),
    ringtone: require("../assets/street.mp3"),
  },
  {
    id: "taxi",
    title: "택시 혼자 타기 무서울 때",
    name: "엄마",
    phoneNumber: "010-1234-5678",
    image: require("../assets/images/taxi.png"),
    ringtone: require("../assets/taxi.mp3"),
  },
];

export function ScenarioSelection() {
  const navigation = useNavigation();

  const sendSituationMessage = async (message) => {
    const url = "https://api.channel.io/open/v5/groups/501934/messages";
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      "x-access-key": "690e39c241b08848e2f8",
      "x-access-secret": "efa1dd4dca75922d66c3df1c0b7c05de",
    };
    const body = JSON.stringify({
      blocks: [
        {
          type: "text",
          value: message,
        },
      ],
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
      });
      const responseData = await response.json();
      if (response.ok) {
      } else {
        console.error("Failed to send message:", responseData);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handlePress = async (scenario) => {
    try {
      navigation.navigate("Incoming", { scenario, from: "ScenarioSelect" });
      // 1. Request permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // Permission denied
        const message = `'${scenario.title}' 상황에서 긴급 호출이 있었으나, 사용자가 위치 정보 접근을 허용하지 않아 위치를 전송할 수 없습니다.`;
        sendSituationMessage(message);
        return;
      }

      // 2. Get location
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

      // 3. Send location message
      const message = `긴급 알림: '${scenario.title}' 상황에서 사용자가 긴급 호출을 사용했습니다. 현재 위치는 다음과 같습니다. 위치: ${mapsLink}`;
      sendSituationMessage(message);
    } catch (error) {
      console.error("Error getting location or sending message:", error);
      // Send a generic error message if something goes wrong
      const message = `'${scenario.title}' 상황에서 긴급 호출이 있었으나, 기술적인 문제로 위치 정보를 가져오는 데 실패했습니다.`;
      sendSituationMessage(message);
    } finally {
      // 4. Navigate to the call screen regardless of location success
      navigation.navigate("Incoming", { scenario, from: "ScenarioSelect" });
    }
  };
  const [customScenarios, setCustomScenarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // 🧠 커스텀 시나리오 로드
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("customScenarios");
      if (saved) setCustomScenarios(JSON.parse(saved));
    })();
  }, []);

  // 🧠 커스텀 시나리오 저장
  const saveCustomScenarios = async (updated) => {
    setCustomScenarios(updated);
    await AsyncStorage.setItem("customScenarios", JSON.stringify(updated));
  };

  const handleAddScenario = (newScenario) => {
    const updated = [...customScenarios, newScenario];
    saveCustomScenarios(updated);
    setModalVisible(false);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="title">상황 선택</ThemedText>
        <ThemedText>탈출하고 싶은 상황을 선택하세요.</ThemedText>
      </ThemedView>

      <ScrollView>
        <View style={styles.cardContainer}>
          {[...SCENARIOS, ...customScenarios].map((scenario) => (
            <Pressable
              key={scenario.id}
              style={styles.card}
              onPress={() => handlePress(scenario)}
            >
              <View style={styles.cardWrapper}>
                <Image
                  source={scenario.image}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.textOverlay}>
                  <ThemedText style={styles.cardText}>
                    {scenario.title}
                  </ThemedText>
                </View>
              </View>
            </Pressable>
          ))}

          {/* + 커스텀 추가 버튼 */}
          <Pressable
            style={[styles.card, styles.addCard]}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.addContent}>
              <ThemedText style={styles.addText}>+ 커스텀 상황 추가</ThemedText>
            </View>
          </Pressable>
        </View>
      </ScrollView>

      {/* 커스텀 모달 */}
      <CustomScenarioModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onComplete={handleAddScenario}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  stepContainer: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
    paddingVertical: 24,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  card: {
    width: "48%",
    aspectRatio: 0.9,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: "transparent",
  },
  cardWrapper: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  textOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 12,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  addCard: {
    borderWidth: 2,
    borderColor: "#aaa",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  addContent: { flex: 1, alignItems: "center", justifyContent: "center" },
  addText: { fontSize: 16, fontWeight: "600", color: "#888" },
});
