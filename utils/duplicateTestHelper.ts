import { Photo } from "../store/slices/photosSlice";
import { PhotoService, PhotoAsset } from "./photoService";

export class DuplicateTestHelper {
  // 模拟照片资产用于测试
  static createMockPhotoAsset(
    fileName: string,
    width: number,
    height: number,
    fileSize: number,
    modificationTime?: number
  ): PhotoAsset {
    return {
      uri: `file://mock/${fileName}`,
      width,
      height,
      fileName,
      fileSize,
      type: "image/jpeg",
      exif: {
        DateTimeOriginal: modificationTime
          ? new Date(modificationTime).toISOString()
          : new Date().toISOString(),
        Make: "Apple",
        Model: "iPhone 14",
        FNumber: 1.8,
        ExposureTime: 1 / 60,
        ISO: 100,
      },
    };
  }

  // 测试重复检测功能
  static testDuplicateDetection() {
    console.log("🧪 开始测试重复检测功能...\n");

    // 创建测试照片
    const photo1 = this.createMockPhotoAsset(
      "IMG_001.jpg",
      1920,
      1080,
      1024000,
      Date.now()
    );
    const photo2 = this.createMockPhotoAsset(
      "IMG_001.jpg",
      1920,
      1080,
      1024000,
      Date.now()
    ); // 相同照片
    const photo3 = this.createMockPhotoAsset(
      "IMG_002.jpg",
      1920,
      1080,
      1024000,
      Date.now()
    ); // 不同照片
    const photo4 = this.createMockPhotoAsset(
      "IMG_001(1).jpg",
      1920,
      1080,
      1024000,
      Date.now()
    ); // 重命名版本

    // 转换为Photo对象
    const photoObj1 = PhotoService.convertAssetToPhoto(photo1);
    const photoObj2 = PhotoService.convertAssetToPhoto(photo2);
    const photoObj3 = PhotoService.convertAssetToPhoto(photo3);
    const photoObj4 = PhotoService.convertAssetToPhoto(photo4);

    // 模拟现有照片列表
    const existingPhotos: Photo[] = [
      {
        ...photoObj1,
        id: "test-id-1",
        createdAt: Date.now(),
      },
    ];

    console.log("📸 测试照片信息:");
    console.log(`照片1: ${photo1.fileName} (${photo1.width}x${photo1.height})`);
    console.log(`照片2: ${photo2.fileName} (${photo2.width}x${photo2.height})`);
    console.log(`照片3: ${photo3.fileName} (${photo3.width}x${photo3.height})`);
    console.log(
      `照片4: ${photo4.fileName} (${photo4.width}x${photo4.height})\n`
    );

    // 测试单张照片重复检测
    console.log("🔍 测试单张照片重复检测:");

    const isDuplicate2 = PhotoService.isPhotoDuplicate(
      photoObj2,
      existingPhotos
    );
    console.log(`照片2是否重复: ${isDuplicate2} (期望: true)`);

    const isDuplicate3 = PhotoService.isPhotoDuplicate(
      photoObj3,
      existingPhotos
    );
    console.log(`照片3是否重复: ${isDuplicate3} (期望: false)`);

    const isDuplicate4 = PhotoService.isPhotoDuplicate(
      photoObj4,
      existingPhotos
    );
    console.log(`照片4是否重复: ${isDuplicate4} (期望: true)`);

    // 测试批量重复检测
    console.log("\n📦 测试批量重复检测:");
    const newPhotos = [photoObj2, photoObj3, photoObj4];
    const { newPhotos: filteredPhotos, duplicateCount } =
      PhotoService.checkDuplicatePhotos(newPhotos, existingPhotos);

    console.log(`检测到重复照片数量: ${duplicateCount} (期望: 2)`);
    console.log(`新照片数量: ${filteredPhotos.length} (期望: 1)`);

    // 测试指纹生成
    console.log("\n🔐 测试指纹生成:");
    const fingerprint1 = PhotoService.generatePhotoFingerprint(photo1);
    const fingerprint2 = PhotoService.generatePhotoFingerprint(photo2);
    const fingerprint3 = PhotoService.generatePhotoFingerprint(photo3);

    console.log(`照片1指纹: ${fingerprint1.substring(0, 8)}...`);
    console.log(`照片2指纹: ${fingerprint2.substring(0, 8)}...`);
    console.log(`照片3指纹: ${fingerprint3.substring(0, 8)}...`);
    console.log(
      `照片1和2指纹相同: ${fingerprint1 === fingerprint2} (期望: true)`
    );
    console.log(
      `照片1和3指纹相同: ${fingerprint1 === fingerprint3} (期望: false)`
    );

    // 测试文件名清理
    console.log("\n🧹 测试文件名清理:");
    const testNames = [
      "IMG_001.jpg",
      "IMG_001(1).jpg",
      "IMG_001_copy.jpg",
      "IMG_001_副本.jpg",
      "IMG_001_123.jpg",
      "photo_20231201.jpg",
    ];

    testNames.forEach((name) => {
      const cleanName = PhotoService["cleanFileName"](name);
      console.log(`${name} -> ${cleanName}`);
    });

    console.log("\n✅ 重复检测功能测试完成！");
  }

  // 测试真实场景
  static testRealWorldScenarios() {
    console.log("🌍 测试真实场景...\n");

    const scenarios = [
      {
        name: "相同照片不同文件名",
        photos: [
          this.createMockPhotoAsset(
            "IMG_001.jpg",
            1920,
            1080,
            1024000,
            1700000000000
          ),
          this.createMockPhotoAsset(
            "IMG_001(1).jpg",
            1920,
            1080,
            1024000,
            1700000000000
          ),
        ],
      },
      {
        name: "相同照片不同大小（压缩）",
        photos: [
          this.createMockPhotoAsset(
            "IMG_001.jpg",
            1920,
            1080,
            1024000,
            1700000000000
          ),
          this.createMockPhotoAsset(
            "IMG_001.jpg",
            1920,
            1080,
            950000,
            1700000000000
          ),
        ],
      },
      {
        name: "不同照片相同尺寸",
        photos: [
          this.createMockPhotoAsset(
            "IMG_001.jpg",
            1920,
            1080,
            1024000,
            1700000000000
          ),
          this.createMockPhotoAsset(
            "IMG_002.jpg",
            1920,
            1080,
            1024000,
            1700000000001
          ),
        ],
      },
      {
        name: "相同照片不同时间（5秒内）",
        photos: [
          this.createMockPhotoAsset(
            "IMG_001.jpg",
            1920,
            1080,
            1024000,
            1700000000000
          ),
          this.createMockPhotoAsset(
            "IMG_001.jpg",
            1920,
            1080,
            1024000,
            1700000000003
          ),
        ],
      },
    ];

    scenarios.forEach((scenario, index) => {
      console.log(`场景 ${index + 1}: ${scenario.name}`);

      const photo1 = PhotoService.convertAssetToPhoto(scenario.photos[0]);
      const photo2 = PhotoService.convertAssetToPhoto(scenario.photos[1]);

      const existingPhotos: Photo[] = [
        {
          ...photo1,
          id: `test-scenario-${index}`,
          createdAt: Date.now(),
        },
      ];

      const isDuplicate = PhotoService.isPhotoDuplicate(photo2, existingPhotos);
      console.log(`  检测结果: ${isDuplicate ? "重复" : "新照片"}`);
      console.log("");
    });
  }

  // 性能测试
  static performanceTest() {
    console.log("⚡ 性能测试...\n");

    const startTime = Date.now();

    // 创建大量测试照片
    const testPhotos: Photo[] = [];
    for (let i = 0; i < 1000; i++) {
      const asset = this.createMockPhotoAsset(
        `IMG_${i.toString().padStart(3, "0")}.jpg`,
        1920,
        1080,
        1024000 + i,
        Date.now() + i
      );
      const photo = PhotoService.convertAssetToPhoto(asset);
      testPhotos.push({
        ...photo,
        id: `test-${i}`,
        createdAt: Date.now(),
      });
    }

    const createTime = Date.now() - startTime;
    console.log(`创建1000张测试照片耗时: ${createTime}ms`);

    // 测试重复检测性能
    const newPhoto = PhotoService.convertAssetToPhoto(
      this.createMockPhotoAsset("IMG_001.jpg", 1920, 1080, 1024000, Date.now())
    );

    const detectStartTime = Date.now();
    const isDuplicate = PhotoService.isPhotoDuplicate(newPhoto, testPhotos);
    const detectTime = Date.now() - detectStartTime;

    console.log(`在1000张照片中检测重复耗时: ${detectTime}ms`);
    console.log(`检测结果: ${isDuplicate ? "重复" : "新照片"}`);
  }
}
