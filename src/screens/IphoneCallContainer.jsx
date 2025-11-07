// src/screens/IphoneCallScreen/IphoneCallContainer.jsx
import { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { IphoneCallScreen } from "./IphoneCallScreen";
import { IphoneCallScreenSendScreen } from "./IphoneCallSendScreen";
import { Audio } from "expo-av";

export function IphoneCallContainer({ navigation, route }) {
  // route params에서 연락처 정보 가져오기 (없으면 기본값 사용)
  const { callerName = "홍길동", callerNumber = "010-1234-5678" } =
    route?.params || {};

  const [callStatus, setCallStatus] = useState("incoming");
  const [callDuration, setCallDuration] = useState("00:00");
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const callStartTime = useRef(null);
  const timerInterval = useRef(null);
  const ringtoneSound = useRef(null);

  // 벨소리 재생
  useEffect(() => {
    let isMounted = true;

    const loadAndPlayRingtone = async () => {
      try {
        // 오디오 모드 설정
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });

        // 벨소리 로드 및 재생
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/iphone-bell.mp3"), // 벨소리 파일 경로
          {
            isLooping: true, // 반복 재생
            volume: 1.0,
          }
        );

        if (isMounted) {
          ringtoneSound.current = sound;
          await sound.playAsync();
        }
      } catch (error) {
        console.error("벨소리 재생 오류:", error);
      }
    };

    // 전화 수신 화면일 때만 벨소리 재생
    if (callStatus === "incoming") {
      loadAndPlayRingtone();
    }

    // 컴포넌트 언마운트 또는 통화 시작 시 벨소리 정지
    return () => {
      isMounted = false;
      if (ringtoneSound.current) {
        ringtoneSound.current.stopAsync();
        ringtoneSound.current.unloadAsync();
        ringtoneSound.current = null;
      }
    };
  }, [callStatus]);

  // 통화 시간 업데이트
  useEffect(() => {
    if (callStatus === "active") {
      callStartTime.current = Date.now();

      timerInterval.current = setInterval(() => {
        if (callStartTime.current) {
          const elapsed = Math.floor(
            (Date.now() - callStartTime.current) / 1000
          );
          const minutes = Math.floor(elapsed / 60);
          const seconds = elapsed % 60;
          setCallDuration(
            `${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`
          );
        }
      }, 1000);
    }

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [callStatus]);

  const handleAccept = async () => {
    // 벨소리 정지
    if (ringtoneSound.current) {
      await ringtoneSound.current.stopAsync();
      await ringtoneSound.current.unloadAsync();
      ringtoneSound.current = null;
    }
    // 즉시 통화 중 화면으로 전환
    setCallStatus("active");
  };

  const handleReject = async () => {
    // 벨소리 정지
    if (ringtoneSound.current) {
      await ringtoneSound.current.stopAsync();
      await ringtoneSound.current.unloadAsync();
      ringtoneSound.current = null;
    }
    // 통화 거절 시 이전 페이지로 이동
    navigation.goBack();
  };

  const handleEndCall = () => {
    // 통화 종료 시 이전 페이지로 이동
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {callStatus === "incoming" ? (
        // 전화 수신 화면
        <IphoneCallScreen
          callerName={callerName}
          onAccept={handleAccept}
          onReject={handleReject}
          onRemind={() => console.log("Remind")}
          onMessage={() => console.log("Message")}
        />
      ) : (
        // 통화 중 화면
        <IphoneCallScreenSendScreen
          callerName={callerName}
          callerNumber={callerNumber}
          callDuration={callDuration}
          onSpeaker={() => setIsSpeakerOn(!isSpeakerOn)}
          onFaceTime={() => console.log("FaceTime")}
          onMute={() => setIsMuted(!isMuted)}
          onAdd={() => console.log("Add")}
          onEndCall={handleEndCall}
          onKeypad={() => console.log("Keypad")}
          isSpeakerOn={isSpeakerOn}
          isMuted={isMuted}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
