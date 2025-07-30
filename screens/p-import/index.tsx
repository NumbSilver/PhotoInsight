import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import styles from './styles';
import ImportOption from './components/ImportOption';


const ImportScreen = () => {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const handleGalleryImport = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        alert('需要相册权限才能导入照片');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        console.log('Selected images:', result.assets);
        router.push('/p-album_home');
      }
    } catch (error) {
      console.error('Error picking images:', error);
    }
  };

  const handleCameraImport = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        alert('需要相机权限才能拍照');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        console.log('Captured image:', result.assets[0]);
        router.push('/p-album_home');
      }
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <FontAwesome6 name="chevron-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>导入照片</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.watermarkContainer}>
          <Text style={styles.watermarkText}>选择照片导入方式，开启创意之旅</Text>
        </View>
        
        <ImportOption 
          title="从系统相册导入"
          description="从您的设备相册中选择一张或多张照片导入到应用中"
          iconName="images"
          imageUrl="https://images.unsplash.com/photo-1598214886806-c87b84b7078b"
          onPress={handleGalleryImport}
        />
        
        <ImportOption 
          title="拍照即时导入"
          description="使用相机拍摄新照片并直接导入到应用中"
          iconName="camera"
          imageUrl="https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
          onPress={handleCameraImport}
        />
        
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>导入后，AI将自动为您的照片生成文案</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ImportScreen;