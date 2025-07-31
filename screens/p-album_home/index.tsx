import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { useAppDispatch } from "../../store/hooks";
import { loadPhotosFromStorage } from "../../store/slices/photosSlice";

import styles from "./styles";
import PhotoGrid from "./components/PhotoGrid";
import GroupsList from "./components/GroupsList";
import Header from "./components/Header";
import ViewTabs from "./components/ViewTabs";
import FloatingActionButton from "./components/FloatingActionButton";
import Watermark from "./components/Watermark";

const AlbumHomeScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<"photos" | "groups">("photos");

  // 在组件挂载时和每次进入页面时加载存储的照片
  useFocusEffect(
    useCallback(() => {
      console.log("AlbumHomeScreen - 页面获得焦点，开始加载照片");
      dispatch(loadPhotosFromStorage());
    }, [dispatch])
  );

  const handleTabChange = (tab: "photos" | "groups") => {
    setActiveTab(tab);
  };

  const handlePhotoPress = (photoId: string) => {
    router.push(`/p-photo_detail?photo_id=${photoId}`);
  };

  const handleGroupPress = (groupId: string) => {
    router.push(`/p-group_manage?group_id=${groupId}`);
  };

  const handleImportPress = () => {
    router.push("/p-import");
  };

  const handleSettingsPress = () => {
    router.push("/p-settings");
  };

  const handleSearchPress = () => {
    // Implement search functionality
    console.log("Search pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="PhotoInsight"
        onSearchPress={handleSearchPress}
        onSettingsPress={handleSettingsPress}
      />

      <ViewTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === "photos" ? (
        <View style={styles.contentContainer}>
          <Watermark text="每一张照片都是时光的诗句" />
          <PhotoGrid onPhotoPress={handlePhotoPress} />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <GroupsList onGroupPress={handleGroupPress} />
        </ScrollView>
      )}

      <FloatingActionButton onPress={handleImportPress} />
    </SafeAreaView>
  );
};

export default AlbumHomeScreen;
