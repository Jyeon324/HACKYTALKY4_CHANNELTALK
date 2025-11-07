import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function CallOngoingScreen() {
  return (
    <View style={styles.container}>
      {/* 📱 배경 그라데이션 */}
      <LinearGradient
        colors={["#0e0d18", "#2b2438", "#40364b", "#524860"]}
        locations={[0, 0.4, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* 상단 통화 정보 */}
      <View style={styles.header}>
        <Text style={styles.voiceText}>UHD Voice 00:02</Text>
        <Text style={styles.callerName}>권유현</Text>
        <Text style={styles.phoneNumber}>휴대전화 010-5526-9220</Text>
      </View>

      {/* ✨ 통화 어시스트 */}
      <TouchableOpacity activeOpacity={0.8} style={styles.assistButton}>
        <Ionicons name="sparkles" size={18} color="#fff" />
        <Text style={styles.assistText}> 통화 어시스트</Text>
      </TouchableOpacity>

      {/* 🔘 하단 컨트롤 영역 */}
      <View style={styles.controlsContainer}>
        <View style={styles.row}>
          <ControlButton icon="record" label="녹음" />
          <ControlButton icon="video-outline" label="영상통화" />
          <ControlButton icon="bluetooth" label="블루투스" />
        </View>

        <View style={styles.row}>
          <ControlButton icon="volume-high" label="스피커" />
          <ControlButton icon="microphone-off" label="내 소리 차단" />
          <ControlButton icon="keypad" label="키패드" />
        </View>

        {/* 🔴 통화 종료 버튼 */}
        <TouchableOpacity activeOpacity={0.8} style={styles.endButton}>
          <Ionicons
            name="call"
            size={36}
            color="#fff"
            style={{ transform: [{ rotate: "135deg" }] }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 🎛️ 개별 컨트롤 버튼 컴포넌트
function ControlButton({ icon, label }) {
  return (
    <TouchableOpacity style={styles.controlButton}>
      <MaterialCommunityIcons name={icon} size={28} color="#fff" />
      <Text style={styles.controlLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// 🎨 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    marginTop: height * 0.12,
    alignItems: "center",
  },
  voiceText: {
    backgroundColor: "#222",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: "600",
    overflow: "hidden",
  },
  callerName: {
    marginTop: 16,
    fontSize: 34,
    color: "#fff",
    fontWeight: "bold",
  },
  phoneNumber: {
    color: "#d1d5db",
    fontSize: 15,
    marginTop: 5,
  },
  assistButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 25,
    marginTop: 20,
  },
  assistText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  controlsContainer: {
    position: "absolute",
    bottom: height * 0.08,
    backgroundColor: "rgba(0,0,0,0.3)",
    width: width * 0.9,
    borderRadius: 30,
    paddingVertical: 25,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "85%",
    marginBottom: 20,
  },
  controlButton: {
    alignItems: "center",
  },
  controlLabel: {
    color: "#fff",
    fontSize: 13,
    marginTop: 6,
  },
  endButton: {
    marginTop: 10,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e64b4b",
    alignItems: "center",
    justifyContent: "center",
  },
});
