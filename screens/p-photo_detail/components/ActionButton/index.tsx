
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import styles from './styles';

interface ActionButtonProps {
  icon: string;
  isActive?: boolean;
  isAccent?: boolean;
  activeColor?: string;
  onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  isActive = false,
  isAccent = false,
  activeColor = '#38BDF8',
  onPress,
}) => {
  const buttonStyle = [
    styles.button,
    isAccent && styles.accentButton,
  ];
  
  const iconColor = isActive 
    ? activeColor 
    : isAccent 
      ? '#FFFFFF' 
      : '#E2E8F0';
  
  return (
    <TouchableOpacity 
      style={buttonStyle}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <FontAwesome6 
        name={icon} 
        size={12} 
        color={iconColor} 
      />
    </TouchableOpacity>
  );
};

export default ActionButton;
