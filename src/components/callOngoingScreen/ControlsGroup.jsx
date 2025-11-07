import React from "react";
import { StyleSheet, View } from "react-native";
import ControlButton from "./ControlButton";
import EndCallButton from "./EndCallButton";
import { height, width } from "../../constants/dimensions";

export default function ControlsGroup({ onEndCall }) {
  return (
    <View style={styles.controlsContainer}>
      <View style={styles.row}>
        <ControlButton icon="boombox" label="녹음" />
        <ControlButton icon="video-outline" label="영상통화" />
        <ControlButton icon="bluetooth" label="블루투스" />
      </View>

      <View style={styles.row}>
        <ControlButton icon="volume-high" label="스피커" />
        <ControlButton icon="microphone-off" label="내 소리 차단" />
        <ControlButton icon="dialpad" label="키패드" />
      </View>

      <EndCallButton onPress={onEndCall} />
    </View>
  );
}

const styles = StyleSheet.create({
  controlsContainer: {
    position: "absolute",
    bottom: height * 0.08,
    backgroundColor: "rgba(0,0,0,0.3)",
    width: width * 0.9,
    borderRadius: 30,
    paddingVertical: 25,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "85%",
    marginBottom: 40,
  },
});
