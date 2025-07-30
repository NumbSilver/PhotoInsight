
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import PhotoItem from '../PhotoItem';

interface PhotoGridProps {
  onPhotoPress: (photoId: string) => void;
}

const PhotoGrid = ({ onPhotoPress }: PhotoGridProps) => {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);

  // Mock photo data
  const photos = [
    { id: '1', uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', caption: '"山间静谧"' },
    { id: '2', uri: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29', caption: '"海天一色"' },
    { id: '3', uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', caption: '"绿意盎然"' },
    { id: '4', uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', caption: '"云雾缭绕"' },
    { id: '5', uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', caption: '"秋日暖阳"' },
    { id: '6', uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', caption: '"林间小道"' },
    { id: '7', uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', caption: '"山峦叠嶂"' },
    { id: '8', uri: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29', caption: '"碧海蓝天"' },
    { id: '9', uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', caption: '"山水如画"' },
    { id: '10', uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', caption: '"金秋时节"' },
    { id: '11', uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', caption: '"森林深处"' },
    { id: '12', uri: '', caption: '', isLoading: true },
  ];

  const handlePhotoPress = (photoId: string) => {
    if (isMultiSelectMode) {
      // In multi-select mode, toggle selection
      if (selectedPhotos.includes(photoId)) {
        setSelectedPhotos(selectedPhotos.filter(id => id !== photoId));
      } else {
        setSelectedPhotos([...selectedPhotos, photoId]);
      }
    } else {
      // In normal mode, navigate to photo detail
      onPhotoPress(photoId);
    }
  };

  const handleLongPress = (photoId: string) => {
    if (!isMultiSelectMode) {
      setIsMultiSelectMode(true);
      setSelectedPhotos([photoId]);
    }
  };

  const renderPhotoRow = (startIndex: number) => {
    return (
      <View style={styles.row}>
        {[0, 1, 2].map(offset => {
          const index = startIndex + offset;
          if (index < photos.length) {
            const photo = photos[index];
            return (
              <PhotoItem
                key={photo.id}
                photo={photo}
                isSelected={selectedPhotos.includes(photo.id)}
                isMultiSelectMode={isMultiSelectMode}
                onPress={() => handlePhotoPress(photo.id)}
                onLongPress={() => handleLongPress(photo.id)}
              />
            );
          }
          return <View key={`empty-${index}`} style={styles.emptyItem} />;
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderPhotoRow(0)}
      {renderPhotoRow(3)}
      {renderPhotoRow(6)}
      {renderPhotoRow(9)}
    </View>
  );
};

export default PhotoGrid;
