import React, { useRef, useEffect } from "react";
import { Animated, TouchableOpacity, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
 * SlideButton (터치 버전)
 * - pulse 애니메이션만 유지
 * - 버튼 터치 시 바로 onComplete() 실행
 */
export default function SlideButton({ color, iconRotate, anim, onComplete }) {
  const pulseLoop = useRef(null);

  /** 💫 pulse 애니메이션 */
  const startPulse = () => {
    if (pulseLoop.current) return;
    pulseLoop.current = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.current.start();
  };

  const stopPulse = () => {
    if (pulseLoop.current) {
      pulseLoop.current.stop();
      pulseLoop.current = null;
    }
  };

  useEffect(() => {
    startPulse();
    return stopPulse;
  }, []);

  /** 💫 퍼지는 pulse 원 */
  const pulseStyle = {
    position: "absolute",
    pointerEvents: "none",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    transform: [
      {
        scale: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 2],
        }),
      },
    ],
    opacity: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    }),
  };

  return (
    <View style={styles.wrapper}>
      <Animated.View style={pulseStyle} />

      {/* 🔹 간단 터치 버튼 */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onComplete}
        style={[styles.circleButton, { backgroundColor: color }]}
      >
        <Ionicons
          name="call"
          size={40}
          color="#fff"
          style={{ transform: [{ rotate: iconRotate }] }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  circleButton: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
