import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
import { StorageService } from "../../utils/storageService";
import { PhotoService } from "../../utils/photoService";

export interface PhotoContent {
  inspiration: string;
  promotion: string;
  tags: string[];
  poem: string;
}

export interface Photo {
  id: string;
  uri: string;
  name: string;
  size: number;
  modificationTime: number;
  width?: number;
  height?: number;
  caption?: string;
  groupId?: string;
  createdAt: number;
  aiContent?: PhotoContent;
}

interface PhotosState {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}

const initialState: PhotosState = {
  photos: [],
  loading: false,
  error: null,
  isInitialized: false,
};

// 生成照片唯一标识的函数
export const generatePhotoId = (
  name: string,
  modificationTime: number,
  size: number
): string => {
  const data = `${name}_${modificationTime}_${size}`;
  return CryptoJS.MD5(data).toString();
};

// 异步thunk：从存储加载照片
export const loadPhotosFromStorage = createAsyncThunk(
  "photos/loadFromStorage",
  async () => {
    const photos = await StorageService.loadPhotos();
    return photos;
  }
);

// 异步thunk：保存照片到存储
export const savePhotosToStorage = createAsyncThunk(
  "photos/saveToStorage",
  async (photos: Photo[]) => {
    await StorageService.savePhotos(photos);
    return photos;
  }
);

// 异步thunk：添加照片到存储
export const addPhotoToStorage = createAsyncThunk(
  "photos/addToStorage",
  async (photo: Photo) => {
    await StorageService.addPhoto(photo);
    return photo;
  }
);

// 异步thunk：从存储删除照片
export const removePhotoFromStorage = createAsyncThunk(
  "photos/removeFromStorage",
  async (photoId: string) => {
    await StorageService.removePhoto(photoId);
    return photoId;
  }
);

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    addPhoto: (
      state,
      action: PayloadAction<Omit<Photo, "id" | "createdAt">>
    ) => {
      console.log(`尝试添加照片: ${action.payload.name}`);
      console.log(`当前照片数量: ${state.photos.length}`);

      // 使用新的指纹检测方法检查重复
      const isDuplicate = PhotoService.isPhotoDuplicate(
        action.payload,
        state.photos
      );

      console.log(`重复检测结果: ${isDuplicate}`);

      if (!isDuplicate) {
        const photoId = generatePhotoId(
          action.payload.name,
          action.payload.modificationTime,
          action.payload.size
        );

        const newPhoto = {
          ...action.payload,
          id: photoId,
          createdAt: Date.now(),
        };
        // 使用不可变更新方式
        state.photos.push(newPhoto);
        console.log(`成功添加照片到Redux: ${newPhoto.name} (ID: ${photoId})`);
        console.log(`添加后照片数量: ${state.photos.length}`);
        console.log(
          "Redux状态更新后的照片列表:",
          state.photos.map((p) => ({ id: p.id, name: p.name }))
        );
        // 异步保存到存储
        StorageService.addPhoto(newPhoto).catch((error) => {
          console.error("保存照片到存储失败:", error);
        });
      } else {
        console.log(`照片已存在，跳过添加: ${action.payload.name}`);
      }
    },

    removePhoto: (state, action: PayloadAction<string>) => {
      const photoId = action.payload;
      state.photos = state.photos.filter((photo) => photo.id !== photoId);
      // 异步从存储删除
      StorageService.removePhoto(photoId).catch((error) => {
        console.error("从存储删除照片失败:", error);
      });
    },

    removeMultiplePhotos: (state, action: PayloadAction<string[]>) => {
      const photoIds = action.payload;
      console.log(`开始删除照片，ID列表:`, photoIds);
      console.log(`删除前照片数量: ${state.photos.length}`);

      const removedPhotos = state.photos.filter((photo) =>
        photoIds.includes(photo.id)
      );
      state.photos = state.photos.filter(
        (photo) => !photoIds.includes(photo.id)
      );

      console.log(`删除后照片数量: ${state.photos.length}`);
      console.log(
        `成功删除 ${removedPhotos.length} 张照片:`,
        removedPhotos.map((p) => p.name)
      );

      // 异步批量删除存储
      StorageService.removeMultiplePhotos(photoIds).catch((error) => {
        console.error("批量删除照片失败:", error);
      });
    },

    updatePhoto: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Photo> }>
    ) => {
      const { id, updates } = action.payload;
      const photoIndex = state.photos.findIndex((photo) => photo.id === id);
      if (photoIndex !== -1) {
        state.photos[photoIndex] = { ...state.photos[photoIndex], ...updates };
        // 异步更新存储
        StorageService.updatePhoto(id, updates).catch((error) => {
          console.error("更新存储中的照片失败:", error);
        });
      }
    },

    updatePhotoContent: (
      state,
      action: PayloadAction<{
        id: string;
        contentType: "inspiration" | "promotion" | "tags" | "poem";
        content: string | string[];
      }>
    ) => {
      const { id, contentType, content } = action.payload;
      const photoIndex = state.photos.findIndex((photo) => photo.id === id);
      if (photoIndex !== -1) {
        const photo = state.photos[photoIndex];
        const aiContent = photo.aiContent || {
          inspiration: "",
          promotion: "",
          tags: [],
          poem: "",
        };

        const updatedAiContent = {
          ...aiContent,
          [contentType]: content,
        };

        state.photos[photoIndex] = {
          ...photo,
          aiContent: updatedAiContent,
        };

        // 异步更新存储
        StorageService.updatePhoto(id, { aiContent: updatedAiContent }).catch(
          (error) => {
            console.error("更新存储中的照片内容失败:", error);
          }
        );
      }
    },

    setPhotos: (state, action: PayloadAction<Photo[]>) => {
      state.photos = action.payload;
      // 异步保存到存储
      StorageService.savePhotos(action.payload).catch((error) => {
        console.error("保存照片到存储失败:", error);
      });
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearPhotos: (state) => {
      state.photos = [];
      // 异步清除存储
      StorageService.clearPhotos().catch((error) => {
        console.error("清除存储失败:", error);
      });
    },

    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 处理从存储加载照片
    builder.addCase(loadPhotosFromStorage.pending, (state) => {
      console.log("loadPhotosFromStorage - 开始加载");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadPhotosFromStorage.fulfilled, (state, action) => {
      console.log(
        `loadPhotosFromStorage - 加载完成，照片数量: ${action.payload.length}`
      );
      state.photos = action.payload;
      state.loading = false;
      state.isInitialized = true;
    });
    builder.addCase(loadPhotosFromStorage.rejected, (state, action) => {
      console.log(`loadPhotosFromStorage - 加载失败: ${action.error.message}`);
      state.loading = false;
      state.error = action.error.message || "加载照片失败";
      state.isInitialized = true;
    });
  },
});

export const {
  addPhoto,
  removePhoto,
  removeMultiplePhotos,
  updatePhoto,
  updatePhotoContent,
  setPhotos,
  setLoading,
  setError,
  clearPhotos,
  setInitialized,
} = photosSlice.actions;

export default photosSlice.reducer;
