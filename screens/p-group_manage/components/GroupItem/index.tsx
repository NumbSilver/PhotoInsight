
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Group } from '../../types';
import styles from './styles';

interface GroupItemProps {
  group: Group;
  onPress: () => void;
  onMenuPress: () => void;
}

const GroupItem = ({ group, onPress, onMenuPress }: GroupItemProps) => {
  const { name, photoCount, coverImage, isAI } = group;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: coverImage }}
          style={styles.coverImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.groupName}>{name}</Text>
            <Text style={styles.photoCount}>{photoCount}张照片</Text>
          </View>
          {isAI ? (
            <View style={styles.aiTag}>
              <Text style={styles.aiTagText}>AI分组</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.menuButton}
              onPress={(e) => {
                e.stopPropagation();
                onMenuPress();
              }}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <FontAwesome6 name="ellipsis-vertical" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupItem;
