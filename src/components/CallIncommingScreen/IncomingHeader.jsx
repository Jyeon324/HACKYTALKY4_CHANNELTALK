import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function IncomingHeader({ name, phoneNumber }) {
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>UHD Voice 수신전화</Text>
      <View style={{ height: 60 }} />
      <Text style={styles.name}>{name}</Text>
      <View style={{ height: 6 }} />
      <Text style={styles.phone}>휴대전화 {phoneNumber}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginTop: 50 },
  subTitle: { color: "#fff", fontSize: 15, fontWeight: "600" },
  name: { color: "#fff", fontSize: 40, fontWeight: "bold" },
  phone: { color: "#d1d5db", fontSize: 15 },
});
