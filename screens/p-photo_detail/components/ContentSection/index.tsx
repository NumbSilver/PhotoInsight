
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import styles from './styles';
import ActionButton from '../ActionButton';

interface ContentSectionProps {
  title: string;
  content: string;
  isPoem?: boolean;
  isLiked?: boolean;
  isDisliked?: boolean;
  onLike: () => void;
  onDislike: () => void;
  onEdit: () => void;
  onRegenerate: () => void;
  onCopy: () => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  content,
  isPoem = false,
  isLiked = false,
  isDisliked = false,
  onLike,
  onDislike,
  onEdit,
  onRegenerate,
  onCopy,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <Text style={[
        styles.content,
        isPoem && styles.poemContent
      ]}>
        {content}
      </Text>
      
      <View style={styles.actionContainer}>
        <View style={styles.feedbackButtons}>
          <ActionButton 
            icon="thumbs-up" 
            isActive={isLiked}
            activeColor="#10B981"
            onPress={onLike}
          />
          <ActionButton 
            icon="thumbs-down" 
            isActive={isDisliked}
            activeColor="#EF4444"
            onPress={onDislike}
          />
        </View>
        
        <View style={styles.actionButtons}>
          <ActionButton 
            icon="edit" 
            onPress={onEdit}
          />
          <ActionButton 
            icon="sync-alt" 
            onPress={onRegenerate}
          />
          <ActionButton 
            icon="copy" 
            isAccent
            onPress={onCopy}
          />
        </View>
      </View>
    </View>
  );
};

export default ContentSection;
