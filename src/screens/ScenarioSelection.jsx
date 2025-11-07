import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import * as Location from 'expo-location';

import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";
import { useNavigation } from "@react-navigation/native";

// TODO: Replace placeholder images with scenario-specific images
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
    ringtone: require("../assets/street.mp3"),
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
    const url = 'https://api.channel.io/open/v5/groups/501934/messages';
    const headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-key': '690e39c241b08848e2f8',
      'x-access-secret': 'efa1dd4dca75922d66c3df1c0b7c05de'
    };
    const body = JSON.stringify({
      blocks: [{
        type: 'text',
        value: message
      }]
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log('Message sent successfully:', responseData);
      } else {
        console.error('Failed to send message:', responseData);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handlePress = async (scenario) => {
    try {
      // 1. Request permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
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
      console.error('Error getting location or sending message:', error);
      // Send a generic error message if something goes wrong
      const message = `'${scenario.title}' 상황에서 긴급 호출이 있었으나, 기술적인 문제로 위치 정보를 가져오는 데 실패했습니다.`;
      sendSituationMessage(message);
    } finally {
      // 4. Navigate to the call screen regardless of location success
      navigation.navigate("Incoming", { scenario, from: "ScenarioSelect" });
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="title">상황 선택</ThemedText>
        <ThemedText>
          탈출하고 싶은 상황을 선택하세요. 5~10초 뒤에 전화가 옵니다.
        </ThemedText>
      </ThemedView>

      <ScrollView>
        <View style={styles.cardContainer}>
          {SCENARIOS.map((scenario) => (
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
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    padding: 16,
  },
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
    // Shadow styles applied here
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: "transparent", // Important for shadows on iOS
  },
  cardWrapper: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden", // This clips the image
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
});
