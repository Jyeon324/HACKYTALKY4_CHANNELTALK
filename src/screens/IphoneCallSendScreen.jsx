// src/components/IphoneCallScreenSendScreen.jsx
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

export function IphoneCallScreenSendScreen({
  callerName = '홍길동',
  callerNumber = '010-4030-3719',
  callDuration = '00:02',
  onSpeaker,
  onFaceTime,
  onMute,
  onAdd,
  onEndCall,
  onKeypad,
  isSpeakerOn = false,
  isMuted = false,
}) {

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* 좌측 상단: 음성 아이콘 */}
      <View style={styles.topContainer}>
        <View style={styles.soundIcon}>
          <View style={styles.soundWave} />
          <View style={[styles.soundWave, { height: 20, marginLeft: 4 }]} />
          <View style={[styles.soundWave, { height: 28, marginLeft: 4 }]} />
        </View>

        {/* 우측 상단: 정보 아이콘 */}
        <TouchableOpacity>
          <View style={styles.infoIcon}>
            <Text style={styles.infoText}>i</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 중앙: 통화 시간과 이름 */}
      <View style={styles.callInfoContainer}>
        <Text style={styles.callDuration}>{callDuration}</Text>
        <Text style={styles.callerNumber}>{callerName}</Text>
      </View>

      {/* 하단: 통화 컨트롤 버튼들 */}
      <View style={styles.controlsContainer}>
        {/* 첫 번째 줄 */}
        <View style={styles.controlRow}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={onSpeaker}
            activeOpacity={0.7}
          >
            <View style={[styles.controlCircle, isSpeakerOn && styles.activeControl]}>
              <MaterialIcons name="volume-up" size={32} color="white" />
            </View>
            <Text style={styles.controlLabel}>스피커</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={onFaceTime}
            activeOpacity={0.7}
          >
            <View style={styles.controlCircle}>
              <MaterialIcons name="videocam" size={32} color="white" />
            </View>
            <Text style={styles.controlLabel}>FaceTime</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={onMute}
            activeOpacity={0.7}
          >
            <View style={[styles.controlCircle, isMuted && styles.activeControl]}>
              <Feather name={isMuted ? "mic-off" : "mic"} size={28} color="white" />
            </View>
            <Text style={styles.controlLabel}>소리 끔</Text>
          </TouchableOpacity>
        </View>

        {/* 두 번째 줄 */}
        <View style={styles.controlRow}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={onAdd}
            activeOpacity={0.7}
          >
            <View style={styles.controlCircle}>
              <AntDesign name="plus" size={32} color="white" />
            </View>
            <Text style={styles.controlLabel}>추가</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={onEndCall}
            activeOpacity={0.7}
          >
            <View style={[styles.controlCircle, styles.endCallButton]}>
              <MaterialIcons name="call-end" size={32} color="white" />
            </View>
            <Text style={styles.controlLabel}>종료</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={onKeypad}
            activeOpacity={0.7}
          >
            <View style={styles.controlCircle}>
              <MaterialIcons name="dialpad" size={36} color="white" />
            </View>
            <Text style={styles.controlLabel}>키패드</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E', // 검은 배경
    alignItems: 'center',
    paddingVertical: 10,
  },

  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },

  soundIcon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  soundWave: {
    width: 4,
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 2,
  },

  // 상단 우측 정보 아이콘
  infoIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
  },

  // 중앙 통화 정보
  callInfoContainer: {
    height: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  callDuration: {
    fontSize: 24,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.69)',
  },
  callerNumber: {
    fontSize: 36,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // 하단 컨트롤 버튼들
  controlsContainer: {
    width: '100%',
    height: '80%',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  controlButton: {
    alignItems: 'center',
  },
  controlCircle: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    backgroundColor: 'rgba(90, 90, 94, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeControl: {
    backgroundColor: '#FFFFFF',
  },
  endCallButton: {
    backgroundColor: '#FF3B30',
  },
  controlLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '400',
  },
});
