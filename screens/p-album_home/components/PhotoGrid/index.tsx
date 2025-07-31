import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  Photo,
  removeMultiplePhotos,
} from "../../../../store/slices/photosSlice";
import styles from "./styles";
import PhotoItem from "../PhotoItem";
import DeleteActionBar from "../DeleteActionBar";
import DeleteToast from "../DeleteToast";

interface PhotoGridProps {
  onPhotoPress: (photoId: string) => void;
}

const PhotoGrid = ({ onPhotoPress }: PhotoGridProps) => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector((state) => state.photos.photos);
  const loading = useAppSelector((state) => state.photos.loading);
  const error = useAppSelector((state) => state.photos.error);

  // 强制重新渲染
  const [forceUpdate, setForceUpdate] = useState(0);
  useEffect(() => {
    if (photos.length > 0) {
      setForceUpdate((prev) => prev + 1);
    }
  }, [photos.length]);

  // 调试信息
  console.log(
    `PhotoGrid - 照片数量: ${photos.length}, 加载状态: ${loading}, 错误: ${error}`
  );
  console.log(
    "PhotoGrid - 照片列表:",
    photos.map((p) => ({ id: p.id, name: p.name }))
  );

  // 强制重新渲染的key
  const renderKey = React.useMemo(() => {
    return `photos-${photos.length}-${photos
      .map((p) => p.id)
      .join("-")}-${forceUpdate}`;
  }, [photos, forceUpdate]);

  // 监听photos数组变化
  useEffect(() => {
    console.log("PhotoGrid - photos数组发生变化，数量:", photos.length);
    console.log(
      "PhotoGrid - 最新照片:",
      photos[photos.length - 1]?.name || "无"
    );
    console.log(
      "PhotoGrid - 所有照片:",
      photos.map((p) => p.name)
    );
  }, [photos]);

  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [deleteToastMessage, setDeleteToastMessage] = useState("");

  const handlePhotoPress = (photoId: string) => {
    if (isMultiSelectMode) {
      // In multi-select mode, toggle selection
      if (selectedPhotos.includes(photoId)) {
        setSelectedPhotos(selectedPhotos.filter((id) => id !== photoId));
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

  const handleCancelSelection = () => {
    setIsMultiSelectMode(false);
    setSelectedPhotos([]);
  };

  const handleDeleteSelected = () => {
    if (selectedPhotos.length > 0) {
      console.log(
        `PhotoGrid - 准备删除照片，选中数量: ${selectedPhotos.length}`
      );
      dispatch(removeMultiplePhotos(selectedPhotos));
      setDeleteToastMessage(`已删除 ${selectedPhotos.length} 张照片`);
      setShowDeleteToast(true);
      setIsMultiSelectMode(false);
      setSelectedPhotos([]);
    }
  };

  const handleSelectAll = () => {
    if (selectedPhotos.length === photos.length) {
      // 如果全选了，则取消全选
      setSelectedPhotos([]);
    } else {
      // 否则全选
      setSelectedPhotos(photos.map((photo) => photo.id));
    }
  };

  const isAllSelected =
    selectedPhotos.length === photos.length && photos.length > 0;

  const renderPhotoRow = ({
    item: rowPhotos,
    index,
  }: {
    item: Photo[];
    index: number;
  }) => {
    return (
      <View style={styles.row}>
        {rowPhotos.map((photo) => (
          <PhotoItem
            key={photo.id}
            photo={photo}
            isSelected={selectedPhotos.includes(photo.id)}
            isMultiSelectMode={isMultiSelectMode}
            onPress={() => handlePhotoPress(photo.id)}
            onLongPress={() => handleLongPress(photo.id)}
          />
        ))}
        {/* 填充空位以保持3列布局 */}
        {rowPhotos.length < 3 &&
          Array.from({ length: 3 - rowPhotos.length }).map((_, i) => (
            <View key={`empty-${index}-${i}`} style={styles.emptyItem} />
          ))}
      </View>
    );
  };

  // 将照片数据分组为3列布局
  const groupedPhotos = React.useMemo(() => {
    console.log("PhotoGrid - 重新计算groupedPhotos，照片数量:", photos.length);
    const rows = [];
    for (let i = 0; i < photos.length; i += 3) {
      rows.push(photos.slice(i, i + 3));
    }
    return rows;
  }, [photos]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#38BDF8" />
        <Text style={styles.loadingText}>加载照片中...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>加载失败: {error}</Text>
      </View>
    );
  }

  if (photos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>暂无照片</Text>
        <Text style={styles.emptySubText}>点击右下角按钮导入照片</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} key={renderKey}>
      <FlatList
        data={groupedPhotos}
        renderItem={renderPhotoRow}
        keyExtractor={(_, index) => `row-${index}-${photos.length}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, { paddingBottom: 20 }]}
        numColumns={1}
        style={styles.flatList}
        extraData={photos}
        removeClippedSubviews={false}
      />

      {isMultiSelectMode && (
        <DeleteActionBar
          selectedCount={selectedPhotos.length}
          onCancel={handleCancelSelection}
          onDelete={handleDeleteSelected}
          onSelectAll={handleSelectAll}
          isAllSelected={isAllSelected}
        />
      )}

      <DeleteToast
        visible={showDeleteToast}
        message={deleteToastMessage}
        onHide={() => setShowDeleteToast(false)}
      />
    </View>
  );
};

export default PhotoGrid;
