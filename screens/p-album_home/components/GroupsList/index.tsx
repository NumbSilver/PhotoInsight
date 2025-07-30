import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';


interface GroupsListProps {
  onGroupPress: (groupId: string) => void;
}

const GroupsList = ({ onGroupPress }: GroupsListProps) => {
  const groups = [
    { 
      id: '1', 
      title: '旅行', 
      photoCount: 12, 
      coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      isAiGenerated: false
    },
    { 
      id: '2', 
      title: '美食', 
      photoCount: 8, 
      coverImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
      isAiGenerated: true
    },
    { 
      id: '3', 
      title: '家人', 
      photoCount: 24, 
      coverImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
      isAiGenerated: false
    },
    { 
      id: '4', 
      title: '城市风景', 
      photoCount: 15, 
      coverImage: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
      isAiGenerated: true
    },
  ];

  return (
    <View style={styles.container}>
      {groups.map(group => (
        <TouchableOpacity
          key={group.id}
          style={styles.groupItem}
          onPress={() => onGroupPress(group.id)}
          activeOpacity={0.8}
        >
          <View style={styles.groupImageContainer}>
            <Image source={{ uri: group.coverImage }} style={styles.groupImage} />
            <View style={styles.gradient} />
            <View style={styles.groupInfo}>
              <View>
                <Text style={styles.groupTitle}>{group.title}</Text>
                <Text style={styles.groupPhotoCount}>{group.photoCount}张照片</Text>
              </View>
              
              {group.isAiGenerated && (
                <View style={styles.aiTag}>
                  <Text style={styles.aiTagText}>AI分组</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default GroupsList;