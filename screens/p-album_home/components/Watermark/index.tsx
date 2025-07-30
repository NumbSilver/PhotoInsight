
import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

interface WatermarkProps {
  text: string;
}

const Watermark = ({ text }: WatermarkProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Watermark;
