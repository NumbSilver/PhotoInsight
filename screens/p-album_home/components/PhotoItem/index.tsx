import { View, Image, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Photo } from "../../../../store/slices/photosSlice";
import styles from "./styles";

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
  onLongPress,
}: PhotoItemProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200 });
  };

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
            <View
              style={[
                styles.selectionIndicator,
                isSelected
                  ? styles.selectedIndicator
                  : styles.unselectedIndicator,
              ]}
            >
              {isSelected && <View style={styles.checkmark} />}
            </View>
          )}
          <View style={styles.captionContainer}>
            <Text style={styles.caption}>{photo.caption}</Text>
          </View>
          {isMultiSelectMode && (
            <View style={styles.deleteOverlay}>
              <View style={styles.deleteIconContainer}>
                <View style={styles.deleteIcon} />
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default PhotoItem;
