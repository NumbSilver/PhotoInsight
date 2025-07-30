
import React, { useRef } from 'react';
import { View, Image, Text, TouchableOpacity, Animated as RNAnimated } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSequence,
  withDelay
} from 'react-native-reanimated';
import styles from './styles';

interface Photo {
  id: string;
  uri: string;
  caption: string;
  isLoading?: boolean;
}

interface PhotoItemProps {
  photo: Photo;
  isSelected: boolean;
  isMultiSelectMode: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

const PhotoItem = ({ 
  photo, 
  isSelected, 
  isMultiSelectMode,
  onPress, 
  onLongPress 
}: PhotoItemProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200 });
  };

  if (photo.isLoading) {
    return (
      <View style={styles.container}>
        <View style={[styles.photoContainer, styles.loadingContainer]} />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        delayLongPress={800}
        style={styles.touchable}
      >
        <View style={styles.photoContainer}>
          <Image source={{ uri: photo.uri }} style={styles.image} />
          {isMultiSelectMode && (
            <View style={[
              styles.selectionIndicator,
              isSelected ? styles.selectedIndicator : styles.unselectedIndicator
            ]}>
              {isSelected && (
                <View style={styles.checkmark} />
              )}
            </View>
          )}
          <View style={styles.captionContainer}>
            <Text style={styles.caption}>{photo.caption}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default PhotoItem;
