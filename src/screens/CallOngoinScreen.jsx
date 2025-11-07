import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";

import Header from "../components/callOngoingScreen/Header";
import AssistButton from "../components/callOngoingScreen/AssistButton";
import ControlsGroup from "../components/callOngoingScreen/ControlsGroup";
import { Animated, StyleSheet, View } from "react-native";
import useRingtone from "../hooks/useRingtone";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

export default function CallOngoingScreen() {
  const route = useRoute();
  const bgAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const { scenario, from } = route.params;
  const ringtoneFile = scenario?.ringtone ?? require("../assets/default.mp3");

  const { start, stop } = useRingtone(ringtoneFile);

  const caller = {
    name: scenario?.name,
    phoneNumber: scenario?.phoneNumber,
  };

  const bgInterpolation = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#0e0d18", "#2b2438"],
  });

  const handleEndCallButton = () => {
    stop();
    const targetRoute = from === "Contacts" ? "Contacts" : "ScenarioSelect";
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: targetRoute }],
      })
    );
  };

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bgAnim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: false,
        }),
        Animated.timing(bgAnim, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: false,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [bgAnim]);

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[StyleSheet.absoluteFill, { backgroundColor: bgInterpolation }]}
      />

      <LinearGradient
        colors={["transparent", "#40364b", "#524860"]}
        locations={[0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      <Header phoneNumber={caller.phoneNumber} callerName={caller.name} />
      <AssistButton />
      <ControlsGroup onEndCall={handleEndCallButton} />
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
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});
