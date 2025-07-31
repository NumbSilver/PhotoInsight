import { useEffect } from "react";
import { View, Text, Animated } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import styles from "./styles";

interface DeleteToastProps {
  visible: boolean;
  message: string;
  onHide: () => void;
}

const DeleteToast = ({ visible, message, onHide }: DeleteToastProps) => {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    if (visible) {
      // 显示动画
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // 3秒后自动隐藏
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <FontAwesome6 name="check" style={styles.icon} />
      </View>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

export default DeleteToast;
