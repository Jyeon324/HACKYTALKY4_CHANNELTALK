import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useCallback, useEffect, useRef } from "react";

export default function useRingtone(file) {
  if (!file) return;
  const player = useAudioPlayer(file, { downloadFirst: true });
  const status = useAudioPlayerStatus(player);
  const isStopped = useRef(false);

  const start = useCallback(() => {
    try {
      isStopped.current = false;
      player.seekTo(0);
      player.play();
    } catch (error) {
      console.log("Ringtone start error: ", error);
    }
  }, [player]);

  const stop = useCallback(() => {
    try {
      if (isStopped.current) return; // ✅ 이미 정지된 경우 무시
      isStopped.current = true;
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
      if (isStopped.current) return;
      try {
        player.pause();
        player.remove();
      } catch (err) {
        console.warn("⚠️ cleanup error:", err);
      }
    };
  }, [player]);

  return { start, stop, isPlaying: status.playing };
}
