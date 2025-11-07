import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import { encode as btoa } from "base-64";

export default function CustomScenarioModal({ visible, onClose, onComplete }) {
  const [customName, setCustomName] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [audioUri, setAudioUri] = useState(null);

  /** ✅ arrayBuffer → base64 변환 (스택 폭발 방지) */
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const chunkSize = 0x8000;

    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode(...chunk);
    }

    // base64 인코딩
    return btoa(binary);
  };

  /** 1️⃣ 서버에 상황 보내고 mp3 저장 */
  const handleGenerateScript = async () => {
    if (!customName.trim()) {
      Alert.alert("입력 필요", "전화 걸려올 사람의 이름을 입력해주세요!");
      return;
    }
    if (!customTitle.trim()) {
      Alert.alert("입력 필요", "상황을 입력해주세요!");
      return;
    }

    setLoading(true);
    try {
      // 1️⃣ ssml 생성 요청
      const ssmlRes = await fetch(
        "https://64312bf17db7.ngrok-free.app/generate_scenario/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            situation: customTitle,
            voice_name: "ko-KR-InJoonNeural",
          }),
        }
      );

      const ssmlData = await ssmlRes.json();
      if (!ssmlData.ssml) {
        Alert.alert("서버 오류", "ssml 데이터를 받지 못했습니다.");
        return;
      }

      // 2️⃣ ssml → mp3 변환 요청
      const audioRes = await fetch(
        "https://64312bf17db7.ngrok-free.app/synthesize/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ssml: ssmlData.ssml }),
        }
      );

      if (!audioRes.ok) throw new Error("오디오 생성 실패");

      // 3️⃣ mp3 → ArrayBuffer → Base64
      const arrayBuffer = await audioRes.arrayBuffer();
      const base64Audio = arrayBufferToBase64(arrayBuffer);

      // 4️⃣ 로컬 파일로 저장
      const fileUri = `${FileSystem.documentDirectory}custom_${Date.now()}.mp3`;

      await FileSystem.writeAsStringAsync(fileUri, base64Audio, {
        encoding: "base64", // ✅ 최신 Expo는 이렇게 써야 함!
      });

      setAudioUri(fileUri);
      setStep(2);
    } catch (err) {
      console.error("대본/음성 생성 오류:", err);
      Alert.alert("오류", "서버와 통신 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  /** 2️⃣ 시나리오 완성 */
  const handleComplete = () => {
    if (!customTitle.trim() || !customName.trim()) return;

    const newScenario = {
      id: `custom_${Date.now()}`,
      title: customTitle,
      name: customName,
      phoneNumber: "010-1234-5678",
      image: require("../assets/images/diy.jpg"),
      ringtone: audioUri,
      isCustom: true,
    };

    onComplete(newScenario);
    setCustomName("");
    setCustomTitle("");
    setAudioUri(null);
    setStep(1);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          {step === 1 && (
            <>
              <Text style={styles.title}>어떤 사람에게 전화오게 할까요?</Text>
              <TextInput
                style={styles.input}
                placeholder="예: 엄마, 친구, 상사 등"
                value={customName}
                onChangeText={setCustomName}
              />
              <Text style={[styles.title, { marginTop: 16 }]}>
                원하는 상황을 작성해주세요
              </Text>
              <TextInput
                style={styles.input}
                placeholder="예: 회식 중 급한 전화가 필요할 때"
                value={customTitle}
                onChangeText={setCustomTitle}
              />
              {loading && (
                <ActivityIndicator
                  size="small"
                  color="#007AFF"
                  style={{ marginVertical: 10 }}
                />
              )}
              <View style={styles.buttonGroup}>
                <Pressable
                  style={styles.button}
                  onPress={handleGenerateScript}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>대본 & 음성 생성하기</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.cancelButton]}
                  onPress={onClose}
                >
                  <Text style={styles.buttonText}>닫기</Text>
                </Pressable>
              </View>
            </>
          )}
          {step === 2 && (
            <>
              <Text style={styles.title}>상황 생성 완료 🎉</Text>
              <Text style={styles.subtitle}>
                음성 파일이 생성되었습니다. 시나리오를 추가하시겠어요?
              </Text>
              <View style={styles.buttonGroup}>
                <Pressable
                  style={[styles.button, { backgroundColor: "#34C759" }]}
                  onPress={handleComplete}
                >
                  <Text style={styles.buttonText}>완성하기</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.cancelButton]}
                  onPress={onClose}
                >
                  <Text style={styles.buttonText}>닫기</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#aaa",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
