import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function MessageButton() {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>메시지 보내기</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { position: "absolute", bottom: 30 },
  text: { color: "#fff", fontSize: 16, opacity: 0.9 },
});
