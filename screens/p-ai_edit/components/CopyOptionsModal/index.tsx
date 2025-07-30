
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { CopyOptionsModalProps } from '../../types';
import styles from './styles';

const CopyOptionsModal: React.FC<CopyOptionsModalProps> = ({
  visible,
  onClose,
  onCopyInspiration,
  onCopyParagraph,
  onCopyTags,
  onCopyPoem,
  onCopyAll,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>选择要复制的内容</Text>
          
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.optionButton} 
              onPress={onCopyInspiration}
            >
              <Text style={styles.optionText}>一句话灵感</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionButton} 
              onPress={onCopyParagraph}
            >
              <Text style={styles.optionText}>一段话宣传</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionButton} 
              onPress={onCopyTags}
            >
              <Text style={styles.optionText}>社交媒体Tag</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionButton} 
              onPress={onCopyPoem}
            >
              <Text style={styles.optionText}>诗歌/散文</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.copyAllButton} 
              onPress={onCopyAll}
            >
              <Text style={styles.copyAllText}>复制全部内容</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={onClose}
          >
            <Text style={styles.cancelText}>取消</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CopyOptionsModal;
