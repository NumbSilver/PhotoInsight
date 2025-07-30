
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import styles from './styles';

interface SettingItemProps {
  title: string;
  subtitle: string;
  onPress: () => void;
  isLast?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({ 
  title, 
  subtitle, 
  onPress, 
  isLast = false 
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isLast ? styles.lastItem : styles.notLastItem
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <FontAwesome6 name="chevron-right" size={14} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default SettingItem;
