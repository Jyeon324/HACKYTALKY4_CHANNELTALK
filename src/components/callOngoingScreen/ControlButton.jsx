import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ControlButton({ icon, label }) {
  return (
    <TouchableOpacity style={styles.controlButton}>
      <MaterialCommunityIcons name={icon} size={28} color="#fff" />
      <Text style={styles.controlLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  controlButton: {
    alignItems: "center",
  },
  controlLabel: {
    color: "#fff",
    fontSize: 13,
    marginTop: 6,
  },
});
