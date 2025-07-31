import AsyncStorage from "@react-native-async-storage/async-storage";
import { Photo } from "../store/slices/photosSlice";

const STORAGE_KEYS = {
  PHOTOS: "photoInsight_photos",
  LAST_SYNC_TIME: "photoInsight_lastSyncTime",
};

export class StorageService {
  // 保存照片数据到本地存储
  static async savePhotos(photos: Photo[]): Promise<void> {
    try {
      const photosData = JSON.stringify(photos);
      await AsyncStorage.setItem(STORAGE_KEYS.PHOTOS, photosData);
      await AsyncStorage.setItem(
        STORAGE_KEYS.LAST_SYNC_TIME,
        Date.now().toString()
      );
      console.log(`已保存 ${photos.length} 张照片到本地存储`);
    } catch (error) {
      console.error("保存照片数据失败:", error);
      throw new Error("保存照片数据失败");
    }
  }

  // 从本地存储加载照片数据
  static async loadPhotos(): Promise<Photo[]> {
    try {
      const photosData = await AsyncStorage.getItem(STORAGE_KEYS.PHOTOS);
      if (photosData) {
        const photos = JSON.parse(photosData) as Photo[];
        console.log(`从本地存储加载了 ${photos.length} 张照片`);
        return photos;
      }
      return [];
    } catch (error) {
      console.error("加载照片数据失败:", error);
      return [];
    }
  }

  // 获取最后同步时间
  static async getLastSyncTime(): Promise<number> {
    try {
      const lastSyncTime = await AsyncStorage.getItem(
        STORAGE_KEYS.LAST_SYNC_TIME
      );
      return lastSyncTime ? parseInt(lastSyncTime, 10) : 0;
    } catch (error) {
      console.error("获取最后同步时间失败:", error);
      return 0;
    }
  }

  // 清除所有照片数据
  static async clearPhotos(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.PHOTOS);
      await AsyncStorage.removeItem(STORAGE_KEYS.LAST_SYNC_TIME);
      console.log("已清除所有照片数据");
    } catch (error) {
      console.error("清除照片数据失败:", error);
      throw new Error("清除照片数据失败");
    }
  }

  // 检查照片是否已存在（基于ID）
  static async isPhotoExists(photoId: string): Promise<boolean> {
    try {
      const photos = await this.loadPhotos();
      return photos.some((photo) => photo.id === photoId);
    } catch (error) {
      console.error("检查照片是否存在失败:", error);
      return false;
    }
  }

  // 获取存储统计信息
  static async getStorageStats(): Promise<{
    photoCount: number;
    lastSyncTime: number;
    storageSize?: number;
  }> {
    try {
      const photos = await this.loadPhotos();
      const lastSyncTime = await this.getLastSyncTime();

      // 计算存储大小（估算）
      const photosData = JSON.stringify(photos);
      const storageSize = new Blob([photosData]).size;

      return {
        photoCount: photos.length,
        lastSyncTime,
        storageSize,
      };
    } catch (error) {
      console.error("获取存储统计信息失败:", error);
      return {
        photoCount: 0,
        lastSyncTime: 0,
      };
    }
  }

  // 批量保存照片（用于初始化）
  static async batchSavePhotos(photos: Photo[]): Promise<void> {
    try {
      await this.savePhotos(photos);
      console.log(`批量保存了 ${photos.length} 张照片`);
    } catch (error) {
      console.error("批量保存照片失败:", error);
      throw error;
    }
  }

  // 添加单张照片到存储
  static async addPhoto(photo: Photo): Promise<void> {
    try {
      const existingPhotos = await this.loadPhotos();

      // 检查是否已存在相同ID的照片
      const exists = existingPhotos.some((p) => p.id === photo.id);
      if (exists) {
        console.log(`照片 ${photo.name} 已存在，跳过添加`);
        return;
      }

      const updatedPhotos = [...existingPhotos, photo];
      await this.savePhotos(updatedPhotos);
      console.log(`已添加照片: ${photo.name}`);
    } catch (error) {
      console.error("添加照片失败:", error);
      throw error;
    }
  }

  // 从存储中删除照片
  static async removePhoto(photoId: string): Promise<void> {
    try {
      const existingPhotos = await this.loadPhotos();
      const updatedPhotos = existingPhotos.filter(
        (photo) => photo.id !== photoId
      );
      await this.savePhotos(updatedPhotos);
      console.log(`已删除照片 ID: ${photoId}`);
    } catch (error) {
      console.error("删除照片失败:", error);
      throw error;
    }
  }

  // 批量删除照片
  static async removeMultiplePhotos(photoIds: string[]): Promise<void> {
    try {
      const existingPhotos = await this.loadPhotos();
      const updatedPhotos = existingPhotos.filter(
        (photo) => !photoIds.includes(photo.id)
      );
      await this.savePhotos(updatedPhotos);
      console.log(`批量删除了 ${photoIds.length} 张照片，ID列表:`, photoIds);
    } catch (error) {
      console.error("批量删除照片失败:", error);
      throw error;
    }
  }

  // 更新照片信息
  static async updatePhoto(
    photoId: string,
    updates: Partial<Photo>
  ): Promise<void> {
    try {
      const existingPhotos = await this.loadPhotos();
      const photoIndex = existingPhotos.findIndex(
        (photo) => photo.id === photoId
      );

      if (photoIndex !== -1) {
        existingPhotos[photoIndex] = {
          ...existingPhotos[photoIndex],
          ...updates,
        };
        await this.savePhotos(existingPhotos);
        console.log(`已更新照片: ${photoId}`);
      } else {
        console.warn(`未找到照片: ${photoId}`);
      }
    } catch (error) {
      console.error("更新照片失败:", error);
      throw error;
    }
  }
}
