import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import styles from './styles';

interface HeaderProps {
  title: string;
  onSearchPress: () => void;
  onSettingsPress: () => void;
}

const Header = ({ title, onSearchPress, onSettingsPress }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onSearchPress}
          activeOpacity={0.7}
        >
          <FontAwesome5 name="search" size={20} color="#E2E8F0" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onSettingsPress}
          activeOpacity={0.7}
        >
          <FontAwesome5 name="cog" size={20} color="#E2E8F0" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;