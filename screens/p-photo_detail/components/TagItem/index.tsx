
import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

interface TagItemProps {
  tag: string;
}

const TagItem: React.FC<TagItemProps> = ({ tag }) => {
  return (
    <Text style={styles.tag}>{tag}</Text>
  );
};

export default TagItem;
