import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addPhoto,
  setLoading,
  setError,
  loadPhotosFromStorage,
} from "../../store/slices/photosSlice";
import { PhotoService } from "../../utils/photoService";
import styles from "./styles";
import ImportOption from "./components/ImportOption";

const ImportScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { photos: existingPhotos } = useAppSelector((state) => state.photos);

  const handleBackPress = () => {
    router.back();
  };

  const handleGalleryImport = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const assets = await PhotoService.pickImagesFromLibrary();

      if (assets.length > 0) {
        const photos = await PhotoService.processPhotoAssets(assets);

        // 检查重复并添加照片
        let addedCount = 0;
        let duplicateCount = 0;

        for (const photo of photos) {
          // 先检查是否重复
          const isDuplicate = PhotoService.isPhotoDuplicate(
            photo,
            existingPhotos
          );
          if (isDuplicate) {
            duplicateCount++;
            console.log(`照片重复，跳过添加: ${photo.name}`);
          } else {
            try {
              dispatch(addPhoto(photo));
              addedCount++;
            } catch (error) {
              console.error(`添加照片失败: ${photo.name}`, error);
            }
          }
        }

        // 显示相应的提示信息
        if (addedCount === 0 && duplicateCount > 0) {
          Alert.alert("提示", "已添加过该照片");
        } else if (addedCount > 0 && duplicateCount > 0) {
          Alert.alert(
            "成功",
            `已导入 ${addedCount} 张照片，已添加过 ${duplicateCount} 张照片`
          );
        } else if (addedCount > 0) {
          Alert.alert("成功", `已导入 ${addedCount} 张照片`);
        }

        // 强制刷新照片列表
        setTimeout(() => {
          dispatch(loadPhotosFromStorage());
        }, 100);

        router.push("/p-album_home");
      }
    } catch (error) {
      console.error("Error picking images:", error);
      dispatch(setError(error instanceof Error ? error.message : "导入失败"));
      Alert.alert("错误", "导入照片失败，请重试");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCameraImport = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const asset = await PhotoService.takePhoto();

      if (asset) {
        const photo = PhotoService.convertAssetToPhoto(asset);

        // 检查是否重复
        const isDuplicate = PhotoService.isPhotoDuplicate(
          photo,
          existingPhotos
        );
        if (isDuplicate) {
          Alert.alert("提示", "已添加过该照片");
        } else {
          try {
            dispatch(addPhoto(photo));
            Alert.alert("成功", "照片已导入");
          } catch (error) {
            console.error(`添加照片失败: ${photo.name}`, error);
            Alert.alert("错误", "照片导入失败，请重试");
          }
        }

        // 强制刷新照片列表
        setTimeout(() => {
          dispatch(loadPhotosFromStorage());
        }, 100);

        router.push("/p-album_home");
      }
    } catch (error) {
      console.error("Error capturing image:", error);
      dispatch(setError(error instanceof Error ? error.message : "拍照失败"));
      Alert.alert("错误", "拍照失败，请重试");
    } finally {
      dispatch(setLoading(false));
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
          <Text style={styles.watermarkText}>
            选择照片导入方式，开启创意之旅
          </Text>
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
          <Text style={styles.hintText}>
            导入后，AI将自动为您的照片生成文案
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ImportScreen;
