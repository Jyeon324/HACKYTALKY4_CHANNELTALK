import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export function PhoneTypeSelectModal({ visible, onClose, onSelectPhoneType }) {
  const handleSelect = (phoneType) => {
    onSelectPhoneType(phoneType);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.phoneTypeModalView}>
          <Text style={styles.phoneTypeModalTitle}>전화 화면 선택</Text>
          <Text style={styles.phoneTypeModalSubtitle}>
            어떤 스타일의 전화 화면을 사용하시겠습니까?
          </Text>

          {/* 아이폰 선택 버튼 */}
          <TouchableOpacity
            style={styles.phoneTypeButton}
            onPress={() => handleSelect('iphone')}
            activeOpacity={0.7}>
            <View style={styles.phoneTypeIcon}>
              <Text style={styles.phoneTypeIconText}>🍎</Text>
            </View>
            <View style={styles.phoneTypeInfo}>
              <Text style={styles.phoneTypeTitle}>iPhone</Text>
              <Text style={styles.phoneTypeDescription}>
                iOS 스타일의 전화 화면
              </Text>
            </View>
          </TouchableOpacity>

          {/* 갤럭시 선택 버튼 */}
          <TouchableOpacity
            style={styles.phoneTypeButton}
            onPress={() => handleSelect('galaxy')}
            activeOpacity={0.7}>
            <View style={[styles.phoneTypeIcon, { backgroundColor: 'black' }]}>
              <FontAwesome name="android" size={32} color="#3DDC84" />
            </View>
            <View style={styles.phoneTypeInfo}>
              <Text style={styles.phoneTypeTitle}>Android</Text>
              <Text style={styles.phoneTypeDescription}>
                Android 스타일의 전화 화면
              </Text>
            </View>
          </TouchableOpacity>

          {/* 취소 버튼 */}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}>
            <Text style={styles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  phoneTypeModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  phoneTypeModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  phoneTypeModalSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 24,
    textAlign: 'center',
  },
  phoneTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  phoneTypeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  phoneTypeIconText: {
    fontSize: 32,
  },
  phoneTypeInfo: {
    flex: 1,
  },
  phoneTypeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  phoneTypeDescription: {
    fontSize: 13,
    color: '#6C757D',
  },
  cancelButton: {
    marginTop: 8,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});

