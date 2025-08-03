import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  removePhoto,
  updatePhotoContent,
} from "../../store/slices/photosSlice";
import styles from "./styles";
import ContentSection from "./components/ContentSection";
import TagItem from "./components/TagItem";
import ActionButton from "./components/ActionButton";
import Toast from "./components/Toast";

const PhotoDetailScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { photo_id = "default" } = useLocalSearchParams();
  const photoId = photo_id;

  // 从Redux store获取照片数据
  const { photos } = useAppSelector((state) => state.photos);
  const realPhoto = photos.find((p) => p.id === photoId);

  const [photo, setPhoto] = useState<PhotoData | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isCopyOptionsVisible, setIsCopyOptionsVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [likedContent, setLikedContent] = useState<Record<string, boolean>>({});
  const [dislikedContent, setDislikedContent] = useState<
    Record<string, boolean>
  >({});

  // 编辑状态
  const [editingContentType, setEditingContentType] =
    useState<ContentType | null>(null);

  // 标签编辑状态
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [editingTags, setEditingTags] = useState<string[]>([]);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    console.log("PhotoDetail - photoId:", photoId);
    console.log("PhotoDetail - realPhoto:", realPhoto);

    if (realPhoto) {
      console.log("PhotoDetail - 使用真实照片:", realPhoto.name, realPhoto.uri);

      // 从Redux获取AI内容，如果没有则使用默认内容
      const aiContent = realPhoto.aiContent || {
        inspiration: `这张${realPhoto.name}展现了独特的视角和美感。`,
        promotion: `这张名为${realPhoto.name}的照片，以其独特的构图和色彩搭配，为我们呈现了一个令人印象深刻的画面。无论是从技术角度还是艺术角度来看，这都是一张值得分享和收藏的作品。`,
        tags: ["#摄影", "#艺术", "#生活", "#美好瞬间", "#视觉享受"],
        poem: `光影交错间<br>定格了这一刻<br>${realPhoto.name}<br>诉说着故事<br><br>每一帧画面<br>都是时光的印记<br>让我们珍惜<br>这美好的瞬间`,
      };

      const photoData: PhotoData = {
        url: realPhoto.uri,
        content: aiContent,
      };
      setPhoto(photoData);
    } else {
      console.log("PhotoDetail - 使用Mock数据");
      // 如果找不到真实照片，使用默认数据
      const photoData = PHOTO_DATA[photoId as string] || PHOTO_DATA.default;
      setPhoto(photoData);
    }
  }, [photoId, realPhoto]);

  const handleBackPress = () => {
    router.back();
  };

  const handleDeletePhoto = () => {
    if (confirm("确定要删除这张照片吗？")) {
      if (realPhoto) {
        // 删除真实照片
        dispatch(removePhoto(realPhoto.id));
        showToast("照片已删除");
      } else {
        showToast("照片已删除");
      }

      setTimeout(() => {
        router.back();
      }, 1500);
    }
  };

  const handleRegenerateContent = (type: ContentType | "all") => {
    setIsRegenerating(true);

    setTimeout(() => {
      if (photo && realPhoto) {
        const availableIds = Object.keys(PHOTO_DATA).filter(
          (id) => id !== photoId
        );
        const randomId =
          availableIds[Math.floor(Math.random() * availableIds.length)];
        const randomContent = PHOTO_DATA[randomId].content;

        const updatedPhoto = { ...photo };

        if (type === "inspiration" || type === "all") {
          updatedPhoto.content.inspiration = randomContent.inspiration;
          dispatch(
            updatePhotoContent({
              id: realPhoto.id,
              contentType: "inspiration",
              content: randomContent.inspiration,
            })
          );
        }

        if (type === "promotion" || type === "all") {
          updatedPhoto.content.promotion = randomContent.promotion;
          dispatch(
            updatePhotoContent({
              id: realPhoto.id,
              contentType: "promotion",
              content: randomContent.promotion,
            })
          );
        }

        if (type === "tags" || type === "all") {
          updatedPhoto.content.tags = [...randomContent.tags];
          dispatch(
            updatePhotoContent({
              id: realPhoto.id,
              contentType: "tags",
              content: [...randomContent.tags],
            })
          );
        }

        if (type === "poem" || type === "all") {
          updatedPhoto.content.poem = randomContent.poem;
          dispatch(
            updatePhotoContent({
              id: realPhoto.id,
              contentType: "poem",
              content: randomContent.poem,
            })
          );
        }

        setPhoto(updatedPhoto);
        setIsRegenerating(false);

        const typeNames: Record<string, string> = {
          inspiration: "一句话灵感",
          promotion: "一段话宣传",
          tags: "社交媒体Tag",
          poem: "诗歌/散文",
          all: "全部文案",
        };

        showToast(`${typeNames[type]}已重新生成`);
      }
    }, 2000);
  };

  const handleCopyContent = (type: ContentType | "all") => {
    if (!photo) return;

    let textToCopy = "";

    switch (type) {
      case "inspiration":
        textToCopy = photo.content.inspiration;
        showToast("一句话灵感已复制");
        break;
      case "promotion":
        textToCopy = photo.content.promotion;
        showToast("一段话宣传已复制");
        break;
      case "tags":
        textToCopy = photo.content.tags.join(" ");
        showToast("社交媒体Tag已复制");
        break;
      case "poem":
        textToCopy = photo.content.poem.replace(/<br>/g, "\n");
        showToast("诗歌/散文已复制");
        break;
      case "all":
        textToCopy = `${photo.content.inspiration}\n\n${
          photo.content.promotion
        }\n\n${photo.content.tags.join(" ")}\n\n${photo.content.poem.replace(
          /<br>/g,
          "\n"
        )}`;
        showToast("全部内容已复制");
        break;
    }

    Clipboard.setString(textToCopy);
    setIsCopyOptionsVisible(false);
  };

  const handleLikeContent = (type: ContentType, isLike: boolean) => {
    if (isLike) {
      setLikedContent((prev) => ({ ...prev, [type]: !prev[type] }));
      if (dislikedContent[type]) {
        setDislikedContent((prev) => ({ ...prev, [type]: false }));
      }
      showToast(`已点赞${getContentTypeName(type)}`);
    } else {
      setDislikedContent((prev) => ({ ...prev, [type]: !prev[type] }));
      if (likedContent[type]) {
        setLikedContent((prev) => ({ ...prev, [type]: false }));
      }
      showToast(`已点踩${getContentTypeName(type)}`);
    }
  };

  const handleEditContent = (type: ContentType) => {
    setEditingContentType(type);
  };

  const handleEditTags = () => {
    setIsEditingTags(true);
    setEditingTags([...(photo?.content.tags || [])]);
  };

  const handleUpdateEditingTag = (index: number, value: string) => {
    const newTags = [...editingTags];
    newTags[index] = value;
    setEditingTags(newTags);
  };

  const handleRemoveEditingTag = (index: number) => {
    const newTags = editingTags.filter((_, i) => i !== index);
    setEditingTags(newTags);
  };

  const handleAddEditingTag = () => {
    setEditingTags([...editingTags, ""]);
  };

  const handleSaveTagsEdit = () => {
    const validTags = editingTags.filter((tag) => tag.trim());
    if (validTags.length > 0 && realPhoto) {
      dispatch(
        updatePhotoContent({
          id: realPhoto.id,
          contentType: "tags",
          content: validTags,
        })
      );
      setIsEditingTags(false);
      showToast("社交媒体Tag已保存");
    }
  };

  const handleCancelTagsEdit = () => {
    setEditingTags([...(photo?.content.tags || [])]);
    setIsEditingTags(false);
  };

  const handleSaveContent = (newContent: string) => {
    if (realPhoto && editingContentType) {
      dispatch(
        updatePhotoContent({
          id: realPhoto.id,
          contentType: editingContentType,
          content: newContent,
        })
      );
      showToast(`${getContentTypeName(editingContentType)}已保存`);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);

    setTimeout(() => {
      setIsToastVisible(false);
    }, 3000);
  };

  const getContentTypeName = (type: ContentType): string => {
    switch (type) {
      case "inspiration":
        return "一句话灵感";
      case "promotion":
        return "一段话宣传";
      case "tags":
        return "社交媒体Tag";
      case "poem":
        return "诗歌/散文";
      default:
        return "";
    }
  };

  if (!photo) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#38BDF8" />
        <Text style={styles.loadingText}>加载中...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <FontAwesome6 name="arrow-left" size={18} color="#E2E8F0" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeletePhoto}
          activeOpacity={0.7}
        >
          <FontAwesome5 name="trash-alt" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        horizontal={false}
        directionalLockEnabled={true}
      >
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: realPhoto ? realPhoto.uri : photo.url }}
            style={styles.photo}
            resizeMode="cover"
          />
        </View>

        <View style={styles.contentContainer}>
          <ContentSection
            title="一句话灵感"
            content={photo.content.inspiration}
            isLiked={likedContent.inspiration}
            isDisliked={dislikedContent.inspiration}
            onLike={() => handleLikeContent("inspiration", true)}
            onDislike={() => handleLikeContent("inspiration", false)}
            onRegenerate={() => handleRegenerateContent("inspiration")}
            onCopy={() => handleCopyContent("inspiration")}
            onEdit={() => handleEditContent("inspiration")}
            onSave={handleSaveContent}
          />

          <ContentSection
            title="一段话宣传"
            content={photo.content.promotion}
            isLiked={likedContent.promotion}
            isDisliked={dislikedContent.promotion}
            onLike={() => handleLikeContent("promotion", true)}
            onDislike={() => handleLikeContent("promotion", false)}
            onRegenerate={() => handleRegenerateContent("promotion")}
            onCopy={() => handleCopyContent("promotion")}
            onEdit={() => handleEditContent("promotion")}
            onSave={handleSaveContent}
          />

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>社交媒体Tag</Text>

            {isEditingTags ? (
              <View style={styles.tagsEditContainer}>
                <View style={styles.tagsEditInputs}>
                  {editingTags.map((tag, index) => (
                    <View key={index} style={styles.tagEditRow}>
                      <TextInput
                        style={styles.tagEditInput}
                        value={tag}
                        onChangeText={(value) =>
                          handleUpdateEditingTag(index, value)
                        }
                        placeholder={`标签 ${index + 1}`}
                        placeholderTextColor="#94A3B8"
                        autoFocus={
                          index === editingTags.length - 1 && tag === ""
                        }
                      />
                      <TouchableOpacity
                        style={styles.removeTagButton}
                        onPress={() => handleRemoveEditingTag(index)}
                        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                      >
                        <FontAwesome5 name="times" size={16} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.addTagButton}
                  onPress={handleAddEditingTag}
                  activeOpacity={0.7}
                >
                  <FontAwesome6
                    name="plus"
                    size={16}
                    color="#38BDF8"
                    style={styles.addTagIcon}
                  />
                  <Text style={styles.addTagText}>添加标签</Text>
                </TouchableOpacity>
                <View style={styles.tagsEditActions}>
                  <TouchableOpacity
                    style={styles.cancelTagsButton}
                    onPress={handleCancelTagsEdit}
                    activeOpacity={0.7}
                  >
                    <FontAwesome5 name="times" size={16} color="#94A3B8" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.saveTagsButton}
                    onPress={handleSaveTagsEdit}
                    activeOpacity={0.7}
                  >
                    <FontAwesome5 name="check" size={16} color="#10B981" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.tagsContainer}>
                {photo.content.tags.map((tag, index) => (
                  <TagItem key={index} tag={tag} />
                ))}
              </View>
            )}

            <View style={styles.actionContainer}>
              <View style={styles.feedbackButtons}>
                <ActionButton
                  icon="thumbs-up"
                  isActive={likedContent.tags}
                  activeColor="#10B981"
                  onPress={() => handleLikeContent("tags", true)}
                />
                <ActionButton
                  icon="thumbs-down"
                  isActive={dislikedContent.tags}
                  activeColor="#EF4444"
                  onPress={() => handleLikeContent("tags", false)}
                />
              </View>

              <View style={styles.actionButtons}>
                <ActionButton icon="edit" onPress={handleEditTags} />
                <ActionButton
                  icon="sync-alt"
                  onPress={() => handleRegenerateContent("tags")}
                />
                <ActionButton
                  icon="copy"
                  isAccent
                  onPress={() => handleCopyContent("tags")}
                />
              </View>
            </View>
          </View>

          <ContentSection
            title="诗歌/散文"
            content={photo.content.poem.replace(/<br>/g, "\n")}
            isPoem
            isLiked={likedContent.poem}
            isDisliked={dislikedContent.poem}
            onLike={() => handleLikeContent("poem", true)}
            onDislike={() => handleLikeContent("poem", false)}
            onRegenerate={() => handleRegenerateContent("poem")}
            onCopy={() => handleCopyContent("poem")}
            onEdit={() => handleEditContent("poem")}
            onSave={handleSaveContent}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.regenerateButton}
          activeOpacity={0.7}
          onPress={() => handleRegenerateContent("all")}
        >
          <FontAwesome5
            name="sync-alt"
            size={16}
            color="#E2E8F0"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>重新生成</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.copyButton}
          activeOpacity={0.7}
          onPress={() => setIsCopyOptionsVisible(true)}
        >
          <FontAwesome6
            name="copy"
            size={16}
            color="#FFFFFF"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>复制全部内容</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isCopyOptionsVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsCopyOptionsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.copyOptionsContainer}>
            <View style={styles.copyOptionsHeader}>
              <Text style={styles.copyOptionsTitle}>选择复制内容</Text>
              <TouchableOpacity
                onPress={() => setIsCopyOptionsVisible(false)}
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <FontAwesome5 name="times" size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <View style={styles.copyOptionsList}>
              <TouchableOpacity
                style={styles.copyOption}
                activeOpacity={0.7}
                onPress={() => handleCopyContent("inspiration")}
              >
                <FontAwesome6
                  name="quote-left"
                  size={16}
                  color="#38BDF8"
                  style={styles.copyOptionIcon}
                />
                <Text style={styles.copyOptionText}>一句话灵感</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.copyOption}
                activeOpacity={0.7}
                onPress={() => handleCopyContent("promotion")}
              >
                <FontAwesome6
                  name="paragraph"
                  size={16}
                  color="#38BDF8"
                  style={styles.copyOptionIcon}
                />
                <Text style={styles.copyOptionText}>一段话宣传</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.copyOption}
                activeOpacity={0.7}
                onPress={() => handleCopyContent("tags")}
              >
                <FontAwesome6
                  name="tags"
                  size={16}
                  color="#38BDF8"
                  style={styles.copyOptionIcon}
                />
                <Text style={styles.copyOptionText}>社交媒体Tag</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.copyOption}
                activeOpacity={0.7}
                onPress={() => handleCopyContent("poem")}
              >
                <FontAwesome5
                  name="feather-alt"
                  size={16}
                  color="#38BDF8"
                  style={styles.copyOptionIcon}
                />
                <Text style={styles.copyOptionText}>诗歌/散文</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.copyAllOption}
                activeOpacity={0.7}
                onPress={() => handleCopyContent("all")}
              >
                <FontAwesome6
                  name="copy"
                  size={16}
                  color="#FFFFFF"
                  style={styles.copyOptionIcon}
                />
                <Text style={styles.copyAllOptionText}>复制全部内容</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {isRegenerating && (
        <View style={styles.regeneratingOverlay}>
          <View style={styles.regeneratingContent}>
            <ActivityIndicator
              size="large"
              color="#38BDF8"
              style={styles.regeneratingSpinner}
            />
            <Text style={styles.regeneratingText}>正在重新生成...</Text>
          </View>
        </View>
      )}

      <Toast message={toastMessage} visible={isToastVisible} />
    </SafeAreaView>
  );
};

type ContentType = "inspiration" | "promotion" | "tags" | "poem";

interface PhotoContent {
  inspiration: string;
  promotion: string;
  tags: string[];
  poem: string;
}

interface PhotoData {
  url: string;
  content: PhotoContent;
}

const PHOTO_DATA: Record<string, PhotoData> = {
  default: {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    content: {
      inspiration: "山峦起伏间，是自然最动人的诗篇。",
      promotion:
        "置身于这壮丽的山脉之间，仿佛能听见大自然的呼吸。蓝天白云下，层峦叠嶂的山脉绵延不绝，每一座山峰都诉说着亘古的故事。这里的空气清新，视野开阔，让人忘却城市的喧嚣，找回内心的宁静。如果你也向往这样的自然美景，不妨放下手中的工作，来一场说走就走的旅行，让心灵在山水间得到真正的放松。",
      tags: [
        "#自然风光",
        "#山水之间",
        "#旅行日记",
        "#治愈系风景",
        "#户外探险",
        "#摄影爱好者",
      ],
      poem: "山，是大地的脊梁<br>承载着岁月的沧桑<br>云，是天空的思绪<br>飘荡着无尽的遐想<br><br>站在山巅之上<br>俯瞰世界的渺小<br>感受生命的壮阔<br>与自然融为一体",
    },
  },
  photo1: {
    url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    content: {
      inspiration: "城市的灯火，照亮了前行的路。",
      promotion:
        "夜幕降临，城市的灯火次第点亮，勾勒出现代都市的轮廓。高楼大厦间，车水马龙的街道上，是无数奔波忙碌的身影。这座不夜城，承载着太多人的梦想与希望，每一盏灯背后都有一个故事。站在高处俯瞰，城市的脉搏清晰可见，这是一幅充满活力与生机的画卷。",
      tags: [
        "#城市夜景",
        "#都市生活",
        "#灯火阑珊",
        "#现代都市",
        "#夜色迷人",
        "#城市摄影",
      ],
      poem: "霓虹闪烁的夜<br>车流如织的街<br>高楼林立间<br>是无数人的家<br><br>城市的脉搏<br>跳动着现代的节拍<br>每一盏灯<br>都是一个梦想的存在",
    },
  },
  photo2: {
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    content: {
      inspiration: "森林深处，是心灵的栖息地。",
      promotion:
        "穿行在这片古老的森林中，阳光透过茂密的树冠，洒下斑驳的光影。空气中弥漫着泥土和植物的清新气息，耳边是鸟儿欢快的鸣叫和溪水潺潺的声音。这里远离尘嚣，是大自然赐予我们的净土，每一棵树、每一片叶都在诉说着生命的奇迹。在这片绿色的海洋中，仿佛所有的烦恼都能得到释放，找回最纯粹的自己。",
      tags: [
        "#森林探险",
        "#大自然",
        "#绿色世界",
        "#户外徒步",
        "#生态摄影",
        "#治愈系",
      ],
      poem: "深邃的森林<br>是时光的见证者<br>每一片树叶<br>都记录着岁月的痕迹<br><br>漫步其中<br>聆听大自然的低语<br>感受生命的律动<br>与万物共呼吸",
    },
  },
};

export default PhotoDetailScreen;
