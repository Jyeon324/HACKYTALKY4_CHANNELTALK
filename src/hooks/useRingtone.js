import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useCallback, useEffect } from "react";

export default function useRingtone(file) {
  if (!file) return;
  const player = useAudioPlayer(file, { downloadFirst: true });
  const status = useAudioPlayerStatus(player);

  const start = useCallback(() => {
    try {
      player.seekTo(0);
      player.play();
    } catch (error) {
      console.log("Ringtone start error: ", error);
    }
  }, [player]);

  const stop = useCallback(() => {
    try {
      player.pause();
    } catch (error) {
      console.log("Ringtone stop error: ", error);
    }
  }, [player]);

  //무한 루프
  useEffect(() => {
    if (
      !status.playing &&
      status.currentTime >= status.duration &&
      status.duration > 0
    ) {
      player.seekTo(0);
      player.play();
    }
  }, [status, player]);

  //언마운트 시 해제
  useEffect(() => {
    return () => {
      player.pause();
      player.remove();
    };
  }, [player]);

  return { start, stop, isPlaying: status.playing };
}
