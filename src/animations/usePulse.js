import { useEffect } from "react";
import { Animated } from "react-native";

export default function usePulse(animationValue) {
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(animationValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [animationValue]);
}
