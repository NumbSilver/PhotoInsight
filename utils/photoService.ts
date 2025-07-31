import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { Photo } from "../store/slices/photosSlice";
import CryptoJS from "crypto-js";

export interface PhotoAsset {
  uri: string;
  width: number;
  height: number;
  fileName?: string | null;
  fileSize?: number;
  type?: string;
  exif?: Record<string, unknown> | null;
}

export class PhotoService {
  // 请求相册权限
  static async requestMediaLibraryPermissions(): Promise<boolean> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === "granted";
  }

  // 请求相机权限
  static async requestCameraPermissions(): Promise<boolean> {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === "granted";
  }

  // 从相册选择照片
  static async pickImagesFromLibrary(): Promise<PhotoAsset[]> {
    try {
      const hasPermission = await this.requestMediaLibraryPermissions();
      if (!hasPermission) {
        throw new Error("需要相册权限才能导入照片");
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
        allowsEditing: false,
      });

      if (result.canceled || !result.assets) {
        return [];
      }

      return result.assets.map((asset) => ({
        uri: asset.uri,
        width: asset.width || 0,
        height: asset.height || 0,
        fileName: asset.fileName || undefined,
        fileSize: asset.fileSize,
        type: asset.type,
        exif: asset.exif || undefined,
      }));
    } catch (error) {
      console.error("选择照片失败:", error);
      throw error;
    }
  }

  // 拍照
  static async takePhoto(): Promise<PhotoAsset | null> {
    try {
      const hasPermission = await this.requestCameraPermissions();
      if (!hasPermission) {
        throw new Error("需要相机权限才能拍照");
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 1,
        allowsEditing: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return null;
      }

      const asset = result.assets[0];
      return {
        uri: asset.uri,
        width: asset.width || 0,
        height: asset.height || 0,
        fileName: asset.fileName || undefined,
        fileSize: asset.fileSize,
        type: asset.type,
        exif: asset.exif || undefined,
      };
    } catch (error) {
      console.error("拍照失败:", error);
      throw error;
    }
  }

  // 将PhotoAsset转换为Photo对象
  static convertAssetToPhoto(
    asset: PhotoAsset
  ): Omit<Photo, "id" | "createdAt"> {
    const fileName = asset.fileName || `photo_${Date.now()}`;
    const fileSize = asset.fileSize || 0;

    // 安全地获取修改时间
    let modificationTime = Date.now();
    if (asset.exif && typeof asset.exif.DateTimeOriginal === "string") {
      const dateTime = new Date(asset.exif.DateTimeOriginal);
      if (!isNaN(dateTime.getTime())) {
        modificationTime = dateTime.getTime();
      }
    }

    return {
      uri: asset.uri,
      name: fileName,
      size: fileSize,
      modificationTime,
      width: asset.width,
      height: asset.height,
      caption: this.generateDefaultCaption(fileName),
    };
  }

  // 生成默认的图片描述
  private static generateDefaultCaption(fileName: string): string {
    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
    return `"${nameWithoutExt}"`;
  }

  // 获取文件信息
  static async getFileInfo(
    uri: string
  ): Promise<{ size: number; modificationTime: number }> {
    try {
      // 在React Native中，我们可以通过fetch获取文件信息
      const response = await fetch(uri);
      const headers = response.headers;

      // 尝试从headers获取文件大小
      const contentLength = headers.get("content-length");
      const size = contentLength ? parseInt(contentLength, 10) : 0;

      // 获取最后修改时间
      const lastModified = headers.get("last-modified");
      const modificationTime = lastModified
        ? new Date(lastModified).getTime()
        : Date.now();

      return { size, modificationTime };
    } catch (error) {
      console.error("获取文件信息失败:", error);
      return { size: 0, modificationTime: Date.now() };
    }
  }

  // 批量处理照片资源
  static async processPhotoAssets(
    assets: PhotoAsset[]
  ): Promise<Omit<Photo, "id" | "createdAt">[]> {
    const photos: Omit<Photo, "id" | "createdAt">[] = [];

    for (const asset of assets) {
      try {
        const photo = this.convertAssetToPhoto(asset);
        photos.push(photo);
      } catch (error) {
        console.error("处理照片资源失败:", error);
      }
    }

    return photos;
  }

  // 生成更可靠的照片指纹（基于多个特征）
  static generatePhotoFingerprint(asset: PhotoAsset): string {
    const features = [];

    // 1. 照片尺寸（最稳定的特征之一）
    features.push(`size_${asset.width}x${asset.height}`);

    // 2. 文件大小（如果可用）
    if (asset.fileSize) {
      features.push(`bytes_${asset.fileSize}`);
    }

    // 3. 文件类型
    if (asset.type) {
      features.push(`type_${asset.type}`);
    }

    // 4. EXIF数据中的关键信息
    if (asset.exif) {
      // 拍摄时间
      if (typeof asset.exif.DateTimeOriginal === "string") {
        features.push(`date_${asset.exif.DateTimeOriginal}`);
      }

      // 相机信息
      if (typeof asset.exif.Make === "string") {
        features.push(`make_${asset.exif.Make}`);
      }
      if (typeof asset.exif.Model === "string") {
        features.push(`model_${asset.exif.Model}`);
      }

      // 拍摄参数
      if (typeof asset.exif.FNumber === "number") {
        features.push(`f_${asset.exif.FNumber}`);
      }
      if (typeof asset.exif.ExposureTime === "number") {
        features.push(`exp_${asset.exif.ExposureTime}`);
      }
      if (typeof asset.exif.ISO === "number") {
        features.push(`iso_${asset.exif.ISO}`);
      }
    }

    // 5. 文件名（去除扩展名和数字后缀）
    if (asset.fileName) {
      const cleanName = this.cleanFileName(asset.fileName);
      features.push(`name_${cleanName}`);
    }

    // 生成MD5哈希
    const fingerprint = features.join("|");
    return CryptoJS.MD5(fingerprint).toString();
  }

  // 清理文件名，去除常见的数字后缀和扩展名
  private static cleanFileName(fileName: string): string {
    // 去除文件扩展名
    let cleanName = fileName.replace(/\.[^/.]+$/, "");

    // 去除常见的数字后缀模式（如 IMG_001, IMG_001(1), IMG_001_copy 等）
    cleanName = cleanName.replace(/_\d+$/, ""); // 去除末尾的数字
    cleanName = cleanName.replace(/\(\d+\)$/, ""); // 去除末尾的括号数字
    cleanName = cleanName.replace(/_copy$/, ""); // 去除 _copy 后缀
    cleanName = cleanName.replace(/_副本$/, ""); // 去除中文副本后缀

    return cleanName.toLowerCase();
  }

  // 检查照片是否重复（使用新的指纹方法）
  static checkDuplicatePhotos(
    newPhotos: Omit<Photo, "id" | "createdAt">[],
    existingPhotos: Photo[]
  ): { newPhotos: Omit<Photo, "id" | "createdAt">[]; duplicateCount: number } {
    const filteredPhotos: Omit<Photo, "id" | "createdAt">[] = [];
    let duplicateCount = 0;

    for (const photo of newPhotos) {
      // 使用新的指纹方法检查重复
      const isDuplicate = this.isPhotoDuplicate(photo, existingPhotos);

      if (isDuplicate) {
        duplicateCount++;
        console.log(`检测到重复照片: ${photo.name}`);
      } else {
        filteredPhotos.push(photo);
        console.log(`新照片: ${photo.name}`);
      }
    }

    return { newPhotos: filteredPhotos, duplicateCount };
  }

  // 检查单张照片是否重复
  static isPhotoDuplicate(
    newPhoto: Omit<Photo, "id" | "createdAt">,
    existingPhotos: Photo[]
  ): boolean {
    for (const existing of existingPhotos) {
      let matchScore = 0;
      const totalChecks = 3;

      // 检查1: 尺寸和大小是否匹配
      if (
        existing.width === newPhoto.width &&
        existing.height === newPhoto.height &&
        Math.abs(existing.size - newPhoto.size) < 1000 // 允许1KB的误差
      ) {
        matchScore++;
      }

      // 检查2: 修改时间是否接近（5秒内）
      if (
        Math.abs(existing.modificationTime - newPhoto.modificationTime) < 5000
      ) {
        matchScore++;
      }

      // 检查3: 文件名相似性
      const existingClean = this.cleanFileName(existing.name);
      const newClean = this.cleanFileName(newPhoto.name);
      if (existingClean === newClean) {
        matchScore++;
      }

      // 如果至少有两个条件匹配，认为是重复照片
      if (matchScore >= 2) {
        console.log(
          `检测到重复照片: ${newPhoto.name} (匹配分数: ${matchScore}/${totalChecks})`
        );
        return true;
      }
    }

    console.log(`新照片: ${newPhoto.name}`);
    return false;
  }

  // 生成照片的详细指纹信息（用于调试）
  static getPhotoFingerprintInfo(asset: PhotoAsset): {
    fingerprint: string;
    features: string[];
    details: Record<string, unknown>;
  } {
    const features = [];
    const details: Record<string, unknown> = {};

    // 基本信息
    details.dimensions = `${asset.width}x${asset.height}`;
    details.fileSize = asset.fileSize;
    details.fileType = asset.type;
    details.fileName = asset.fileName;

    features.push(`size_${asset.width}x${asset.height}`);

    if (asset.fileSize) {
      features.push(`bytes_${asset.fileSize}`);
      details.fileSizeBytes = asset.fileSize;
    }

    if (asset.type) {
      features.push(`type_${asset.type}`);
      details.fileType = asset.type;
    }

    // EXIF信息
    if (asset.exif) {
      details.exif = asset.exif;

      if (typeof asset.exif.DateTimeOriginal === "string") {
        features.push(`date_${asset.exif.DateTimeOriginal}`);
        details.shootingDate = asset.exif.DateTimeOriginal;
      }

      if (typeof asset.exif.Make === "string") {
        features.push(`make_${asset.exif.Make}`);
        details.cameraMake = asset.exif.Make;
      }

      if (typeof asset.exif.Model === "string") {
        features.push(`model_${asset.exif.Model}`);
        details.cameraModel = asset.exif.Model;
      }
    }

    if (asset.fileName) {
      const cleanName = this.cleanFileName(asset.fileName);
      features.push(`name_${cleanName}`);
      details.cleanFileName = cleanName;
    }

    const fingerprint = CryptoJS.MD5(features.join("|")).toString();

    return {
      fingerprint,
      features,
      details,
    };
  }
}
