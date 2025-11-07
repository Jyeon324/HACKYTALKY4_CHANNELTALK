import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";
import { width, height } from "../constants/dimensions";
import useRingtone from "../hooks/useRingtone";
import useVibration from "../hooks/useVibration";
import IncomingHeader from "../components/CallIncommingScreen/IncomingHeader";
import CallInfoBox from "../components/CallIncommingScreen/CallInfoBox";
import SlideButton from "../components/CallIncommingScreen/SlideButton";
import MessageButton from "../components/CallIncommingScreen/MessageButton";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function CallIncomingScreen() {
  const bgAnim = useRef(new Animated.Value(0)).current;
  const pulseAccept = useRef(new Animated.Value(0)).current;
  const pulseDecline = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const route = useRoute();

  const { start, stop } = useRingtone(require("../assets/galaxy_ringtone.mp3"));
  const { stop: stopVibration } = useVibration([0, 1000, 1000]);
  const { scenario } = route.params;

  // 💡 배경 색상 애니메이션
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bgAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
        }),
        Animated.timing(bgAnim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const bgInterpolation = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#0e0d18", "#2b2438"],
  });

  const caller = {
    name: scenario?.name,
    phoneNumber: scenario?.phoneNumber,
  };

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  const onAccept = (scenario) => {
    stop();
    stopVibration();
    navigation.navigate("Ongoing", { scenario });
  };

  const onDecline = () => {
    stop();
    stopVibration();
  };

  return (
    <View style={styles.container}>
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

      <IncomingHeader name={caller.name} phoneNumber={caller.phoneNumber} />

      <View style={styles.callInfoSection} pointerEvents="box-none">
        <CallInfoBox />
      </View>

      <View style={styles.footer} pointerEvents="box-none">
        <SlideButton
          color={COLORS.primary}
          iconRotate="0deg"
          anim={pulseAccept}
          onComplete={() => onAccept(scenario)}
        />
        <SlideButton
          color={COLORS.danger}
          iconRotate="135deg"
          anim={pulseDecline}
          onComplete={onDecline}
        />
      </View>

      <MessageButton pointerEvents="none" />
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
  footer: {
    position: "absolute",
    bottom: height * 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.8,
    zIndex: 10,
  },
  callInfoSection: {
    position: "absolute",
    bottom: height * 0.2,
    alignItems: "center",
    width: "100%",
    zIndex: 1,
  },
});
