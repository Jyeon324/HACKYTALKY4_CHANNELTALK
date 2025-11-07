import { Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

function HomeScreen({ navigation }) {
  const handleSituationCall = () => {
    navigation.navigate("ScenarioSelect");
  };

  const handleContactCall = () => {
    navigation.navigate("Contacts");
  };

  const handleChannelTalk = () => {
    navigation.navigate("ChannelTalk");
  };


  const handleIphoneCall = () => {
    navigation.navigate("IphoneCall");
  };

  return (
    <LinearGradient
      colors={["#667eea", "#764ba2", "#f093fb"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>가짜 전화</Text>
        <Text style={styles.headerSubtitle}>긴급 탈출이 필요할 때</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <View style={[styles.iconCircle, { backgroundColor: "#FF6B9D" }]}>
                <Text style={styles.iconText}>📱</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>상황별 전화</Text>
            <Text style={styles.cardDescription}>
              소개팅, 회식, 친구모임 등{"\n"}
              상황에 맞는 가짜 전화를 받아보세요
            </Text>
            <TouchableOpacity
              style={styles.cardButton}
              activeOpacity={0.8}
              onPress={handleSituationCall}
            >
              <Text style={styles.buttonText}>6가지 상황</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <View style={[styles.iconCircle, { backgroundColor: "#4FACFE" }]}>
                <Text style={styles.iconText}>👤</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>연락처 전화</Text>
            <Text style={styles.cardDescription}>
              원하는 연락처의 이름과 번호로{"\n"}
              전화를 받아보세요
            </Text>
            <TouchableOpacity
              style={styles.cardButton}
              activeOpacity={0.8}
              onPress={handleContactCall}
            >
              <Text style={styles.buttonText}>연락처</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.cardButton, { marginBottom: 15 }]}
          activeOpacity={0.8}
          onPress={handleChannelTalk}
        >
          <Text style={styles.buttonText}>채널톡 문의</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          💡 Tip: 벨소리와 진동을 설정할 수 있어요
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  header: {
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    height: "45%",
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    padding: 24,
    marginVertical: 10,
  },
  cardContent: {
    height: "50%",
    width: "100%",
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  iconContainer: {
    marginVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  iconText: {
    fontSize: 40,
  },
  cardTitle: {
    height: 30,
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3748",
  },
  cardDescription: {
    fontSize: 13,
    color: "#718096",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
  },
  cardButton: {
    width: 100,
    height: 30,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#CBD5E0",
  },
  badgeText: {
    fontSize: 13,
    color: "#4A5568",
    fontWeight: "600",
  },
  buttonText: {
    fontSize: 14,
    color: "#4A5568",
    fontWeight: "600",
  },
  footer: {
    paddingVertical: 24,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
    textAlign: "center",
  },
});

export { HomeScreen };
