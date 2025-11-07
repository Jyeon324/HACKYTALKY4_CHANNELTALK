import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { height } from "../../constants/dimensions";

export default function Header({ callerName, phoneNumber }) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // 언마운트 시 정리
  }, []);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <View style={styles.header}>
      <Text style={styles.voiceText}>UHD Voice {formatTime(seconds)}</Text>
      <Text style={styles.callerName}>{callerName}</Text>
      <Text style={styles.phoneNumber}>휴대전화 {phoneNumber}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
