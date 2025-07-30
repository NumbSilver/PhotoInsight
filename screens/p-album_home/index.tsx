
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming 
} from 'react-native-reanimated';

import styles from './styles';
import PhotoGrid from './components/PhotoGrid';
import GroupsList from './components/GroupsList';
import Header from './components/Header';
import ViewTabs from './components/ViewTabs';
import FloatingActionButton from './components/FloatingActionButton';
import Watermark from './components/Watermark';

const AlbumHomeScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'photos' | 'groups'>('photos');
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab: 'photos' | 'groups') => {
    setActiveTab(tab);
  };

  const handlePhotoPress = (photoId: string) => {
    router.push(`/p-photo_detail?photo_id=${photoId}`);
  };

  const handleGroupPress = (groupId: string) => {
    router.push(`/p-group_manage?group_id=${groupId}`);
  };

  const handleImportPress = () => {
    router.push('/p-import');
  };

  const handleSettingsPress = () => {
    router.push('/p-settings');
  };

  const handleSearchPress = () => {
    // Implement search functionality
    console.log('Search pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="PhotoInsight" 
        onSearchPress={handleSearchPress}
        onSettingsPress={handleSettingsPress}
      />
      
      <ViewTabs 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'photos' ? (
          <>
            <Watermark text="每一张照片都是时光的诗句" />
            <PhotoGrid onPhotoPress={handlePhotoPress} />
          </>
        ) : (
          <GroupsList onGroupPress={handleGroupPress} />
        )}
      </ScrollView>

      <FloatingActionButton onPress={handleImportPress} />
    </SafeAreaView>
  );
};

export default AlbumHomeScreen;
