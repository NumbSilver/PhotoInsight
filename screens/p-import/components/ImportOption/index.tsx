
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import styles from './styles';

interface ImportOptionProps {
  title: string;
  description: string;
  iconName: string;
  imageUrl: string;
  onPress: () => void;
}

const ImportOption: React.FC<ImportOptionProps> = ({ 
  title, 
  description, 
  iconName, 
  imageUrl, 
  onPress 
}) => {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ scale: scale.value }]
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200 });
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.backgroundImage}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          <View style={styles.iconContainer}>
            <FontAwesome6 name={iconName} style={styles.icon} />
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ImportOption;
