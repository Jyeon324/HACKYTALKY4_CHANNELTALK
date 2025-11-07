import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { height } from "../../constants/dimensions";

export default function AssistButton() {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.assistButton}>
      <Ionicons name="sparkles" size={18} color="#fff" />
      <Text style={styles.assistText}> 통화 어시스트</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  assistButton: {
    position: "absolute",
    bottom: height * 0.5, // 화면 하단에서 25% 위 (EndCallButton보다 위쪽)
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 25,
  },
  assistText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
});
