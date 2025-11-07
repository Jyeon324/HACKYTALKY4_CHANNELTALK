import { useEffect } from "react";
import { Vibration } from "react-native";

export default function useVibration(pattern = [0, 1000, 1000]) {
  useEffect(() => {
    Vibration.vibrate(pattern, true);
    return () => Vibration.cancel();
  }, []);

  const stop = () => Vibration.cancel();

  return { stop };
}
