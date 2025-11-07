import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { height } from "../../constants/dimensions";

export default function EndCallButton() {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.endButton}>
      <Ionicons
        name="call"
        size={36}
        color="#fff"
        style={{ transform: [{ rotate: "135deg" }] }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  endButton: {
    marginTop: 30,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#c84c3e",
    alignItems: "center",
    justifyContent: "center",
  },
});
