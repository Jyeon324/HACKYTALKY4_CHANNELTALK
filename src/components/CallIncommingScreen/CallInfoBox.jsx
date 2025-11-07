import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CallInfoBox() {
  return (
    <View style={styles.container}>
      <View style={styles.lastCallContainer}>
        <Text style={styles.lastCall}>마지막 통화</Text>
        <Text style={styles.lastCallDay}>수요일</Text>
      </View>
      <View style={styles.assistBox}>
        <Ionicons name="sparkles" size={16} color="#fff" />
        <Text style={styles.assistText}> 통화 어시스트</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 40 },
  lastCallContainer: { alignItems: "center", marginBottom: 16 },
  lastCall: { color: "#fff", fontSize: 13 },
  lastCallDay: { color: "#fff", fontSize: 13 },
  assistBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  assistText: { color: "#fff", fontSize: 15 },
});
