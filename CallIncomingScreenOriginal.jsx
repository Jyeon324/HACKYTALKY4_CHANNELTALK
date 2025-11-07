import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Vibration,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import SlideButton from "../components/CallIncommingScreen/SlideButton";

const { width, height } = Dimensions.get("window");

export default function CallIncomingScreen() {
  const colorAnim = useRef(new Animated.Value(0)).current;
  const pulseAnimAccept = useRef(new Animated.Value(0)).current;
  const pulseAnimDecline = useRef(new Animated.Value(0)).current;
  const soundRef = useRef(null);

  // 🎵 벨소리 + 진동
  useEffect(() => {
    const playRingtone = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/ringtone.mp3"),
          { shouldPlay: true, isLooping: true }
        );
        soundRef.current = sound;
        await sound.playAsync();
      } catch (err) {
        console.log("Ringtone error:", err);
      }
    };
    playRingtone();

    Vibration.vibrate([0, 1000, 1000], true); // 1초 진동 → 1초 쉬기 반복

    return () => {
      Vibration.cancel();
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // 🎨 배경색 애니메이션
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const bgInterpolation = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#0e0d18", "#2b2438"],
  });

  const onAccept = () => {
    console.log("📞 수신 버튼 눌림!");
    Vibration.cancel();
    soundRef.current?.stopAsync();
  };

  const onDecline = () => {
    console.log("❌ 거절 버튼 눌림!");
    Vibration.cancel();
    soundRef.current?.stopAsync();
  };

  return (
    <View style={styles.container}>
      {/* 🔹 배경 (터치 막지 않도록 pointerEvents="none") */}
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { backgroundColor: bgInterpolation }]}
      />
      <LinearGradient
        pointerEvents="none"
        colors={["transparent", "#40364b", "#524860"]}
        locations={[0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* 🔹 상단 정보 */}
      <View style={styles.content}>
        <Text style={styles.subTitle}>UHD Voice 수신전화</Text>
        <View style={{ height: 16 }} />
        <Text style={styles.name}>권오성</Text>
        <View style={{ height: 6 }} />
        <Text style={styles.phone}>휴대전화 010-4514-9220</Text>
      </View>

      {/* 🔹 하단 정보 */}
      <View style={styles.bottomSection}>
        <View style={styles.lastCallContainer}>
          <Text style={styles.lastCall}>마지막 통화</Text>
          <Text style={styles.lastCallDay}>수요일</Text>
        </View>
        <View style={styles.assistBox}>
          <Ionicons name="sparkles" size={16} color="#fff" />
          <Text style={styles.assistText}> 통화 어시스트</Text>
        </View>
      </View>

      {/* 🔹 버튼 영역 */}
      <View style={styles.footer}>
        <SlideButton
          color="#3aba69"
          iconRotate="0deg"
          anim={pulseAnimAccept}
          onComplete={onAccept}
        />
        <SlideButton
          color="#c24f4f"
          iconRotate="135deg"
          anim={pulseAnimDecline}
          onComplete={onDecline}
        />
      </View>

      <Text style={styles.messageButton}>메시지 보내기</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    marginTop: height * 0.12,
  },
  subTitle: {
    color: "#ccc",
    fontSize: 15,
    fontWeight: "600",
  },
  name: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  phone: {
    color: "#ddd",
    fontSize: 15,
  },
  bottomSection: {
    position: "absolute",
    bottom: height * 0.25,
    alignItems: "center",
  },
  lastCallContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  lastCall: {
    color: "#888",
    fontSize: 13,
    textAlign: "center",
  },
  lastCallDay: {
    color: "#888",
    fontSize: 13,
    textAlign: "center",
  },
  assistBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  assistText: {
    color: "#fff",
    fontSize: 15,
  },
  footer: {
    position: "absolute",
    bottom: height * 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.8,
  },
  messageButton: {
    position: "absolute",
    bottom: 30,
    color: "#fff",
    fontSize: 16,
    opacity: 0.9,
  },
});
