// src/components/IphoneCallScreen.jsx
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export function IphoneCallScreen({
  callerName = '홍길동',
  onAccept,
  onReject,
  onRemind,
  onMessage,
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

      {/* 상단: 발신자 정보 */}
      <View style={styles.header}>
        <Text style={styles.callerName}>{callerName}</Text>
      </View>

      {/* 중간: 옵션 버튼들 */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={styles.optionButton}
          onPress={onMessage}
          activeOpacity={0.7}
        >
          <View style={styles.iconCircle}>
          <FontAwesome name="comment" size={24} color="white" />
          </View>
          <Text style={styles.optionLabel}>메시지 보내기</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.optionButton}
          onPress={onRemind}
          activeOpacity={0.7}
        >
          <View style={styles.iconCircle}>
          <Feather name="voicemail" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.optionLabel}>음성 사서함</Text>
        </TouchableOpacity>
      </View>

      {/* 하단: 액션 버튼들 */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onReject}
          activeOpacity={0.8}
        >
          <View style={[styles.largeButton, styles.rejectButton]}>
            <Text style={styles.largeButtonIcon}>✕</Text>
          </View>
          <Text style={styles.actionLabel}>거절</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onAccept}
          activeOpacity={0.8}
        >
          <View style={[styles.largeButton, styles.acceptButton]}>
            <Text style={styles.largeButtonIcon}>✓</Text>
          </View>
          <Text style={styles.actionLabel}>응답</Text>
        </TouchableOpacity>
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
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
  },

  // 상단 발신자 정보
  header: {
    width: '100%',
    height: '55%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  callerName: {
    fontSize: 40,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // 중간 옵션 버튼들
  optionsContainer: {
    width: '80%',
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  optionButton: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: 'rgba(90, 90, 94, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  iconText: {
    fontSize: 25,
  },
  optionLabel: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '400',
  },

  // 하단 액션 버튼들
  actionsContainer: {
    flexDirection: 'row',
    width: '80%',
    height: '10%',
    justifyContent: 'space-between',
    marginBottom: 40, 
    paddingHorizontal: 10,
    },
  actionButton: {
    alignItems: 'center',
  },
  largeButton: {
    width: 65,
    height: 65,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  rejectButton: {
    backgroundColor: '#FF3B30',
  },
  acceptButton: {
    backgroundColor: '#34C759',
  },
  largeButtonIcon: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actionLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '400',
  }
});
