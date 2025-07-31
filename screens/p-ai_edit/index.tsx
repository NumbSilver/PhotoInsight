import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import styles from "./styles";
import ParameterSection from "./components/ParameterSection";
import CopyOptionsModal from "./components/CopyOptionsModal";
import ToastMessage from "./components/ToastMessage";
import { ContentData, PhotoData } from "./types";

const AIEditScreen = () => {
  const router = useRouter();
  const { photo_id = "default", content_id = "default" } =
    useLocalSearchParams();

  const [photoData, setPhotoData] = useState<PhotoData | null>(null);
  const [inspirationSentence, setInspirationSentence] = useState("");
  const [promotionParagraph, setPromotionParagraph] = useState("");
  const [socialMediaTags, setSocialMediaTags] = useState("");
  const [poemEssay, setPoemEssay] = useState("");
  const [isParameterExpanded, setIsParameterExpanded] = useState(false);
  const [isCopyModalVisible, setIsCopyModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [languageStyle, setLanguageStyle] = useState("casual");
  const [language, setLanguage] = useState("zh");
  const [socialPlatform, setSocialPlatform] = useState("weixin");
  const [wordCount, setWordCount] = useState("120-150");
  const [emotionalTendency, setEmotionalTendency] = useState("positive");
  const [keywordsPreference, setKeywordsPreference] = useState("");

  const [inspirationCount, setInspirationCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [tagsCount, setTagsCount] = useState(0);
  const [poemCount, setPoemCount] = useState(0);

  useEffect(() => {
    loadPhotoAndContent();
  }, []);

  useEffect(() => {
    setInspirationCount(inspirationSentence.length);
    setParagraphCount(promotionParagraph.length);
    setTagsCount(
      socialMediaTags.split("#").filter((tag) => tag.trim() !== "").length
    );
    setPoemCount(poemEssay.length);
  }, [inspirationSentence, promotionParagraph, socialMediaTags, poemEssay]);

  const loadPhotoAndContent = () => {
    const mockPhotos = {
      default: {
        thumbnail:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        content: {
          inspiration_sentence: "山峦起伏间，感受自然的壮丽与宁静",
          promotion_paragraph:
            "站在山巅之上，俯瞰这壮丽的自然景观，心灵仿佛得到了净化。蓝天白云下，连绵起伏的山脉如同大地的脉搏，诉说着亘古的故事。这一刻，所有的烦恼都烟消云散，只剩下内心深处的平静与感动。",
          social_media_tags:
            "#自然风光 #山水之美 #旅行日记 #心灵净化 #大自然 #户外探险 #风景摄影 #治愈系",
          poem_essay:
            "山，是大地的脊梁\n层峦叠嶂，是时光的褶皱\n我站在这里\n聆听风的私语，云的歌唱\n感受那亘古不变的力量\n和永恒流淌的时光",
          parameters: {
            language_style: "casual",
            language: "zh",
            social_platform: "weixin",
            word_count: "120-150",
            emotional_tendency: "positive",
            keywords_preference: "山峦,自然,宁静,壮丽",
          },
        },
      },
    };

    const photoId = typeof photo_id === "string" ? photo_id : "default";
    const data = mockPhotos[
      photoId as keyof typeof mockPhotos
    ] as (typeof mockPhotos)["default"];
    if (data) {
      setPhotoData(data);
      setInspirationSentence(data.content.inspiration_sentence);
      setPromotionParagraph(data.content.promotion_paragraph);
      setSocialMediaTags(data.content.social_media_tags);
      setPoemEssay(data.content.poem_essay);

      setLanguageStyle(data.content.parameters.language_style);
      setLanguage(data.content.parameters.language);
      setSocialPlatform(data.content.parameters.social_platform);
      setWordCount(data.content.parameters.word_count);
      setEmotionalTendency(data.content.parameters.emotional_tendency);
      setKeywordsPreference(data.content.parameters.keywords_preference);
    }
  };

  const handleSaveContent = () => {
    const contentToSave = {
      photo_id,
      content_id,
      inspiration_sentence: inspirationSentence,
      promotion_paragraph: promotionParagraph,
      social_media_tags: socialMediaTags,
      poem_essay: poemEssay,
      parameters: {
        language_style: languageStyle,
        language,
        social_platform: socialPlatform,
        word_count: wordCount,
        emotional_tendency: emotionalTendency,
        keywords_preference: keywordsPreference,
      },
    };

    console.log("Saving content:", contentToSave);
    showToastMessage("文案已保存");

    setTimeout(() => {
      router.push(`/p-photo_detail?photo_id=${photo_id}`);
    }, 1500);
  };

  const handleBackPress = () => {
    Alert.alert("保存修改", "是否保存修改？", [
      {
        text: "取消",
        style: "cancel",
        onPress: () => router.back(),
      },
      {
        text: "保存",
        onPress: () => {
          handleSaveContent();
          router.back();
        },
      },
    ]);
  };

  const handleRegenerateContent = () => {
    setIsLoading(true);

    setTimeout(() => {
      const newContent = {
        inspiration_sentence: "群山环抱中，寻找内心的宁静与力量",
        promotion_paragraph:
          "置身于这壮丽的山脉之间，仿佛找到了生命的原点。远离城市的喧嚣，这里只有清新的空气和广阔的视野。每一次呼吸都是对心灵的洗礼，每一眼远望都是对灵魂的滋养。大自然的鬼斧神工，让人不禁感叹生命的渺小与伟大。",
        social_media_tags:
          "#山野探险 #自然之美 #心灵之旅 #壮丽风景 #户外生活 #远离喧嚣 #呼吸自由 #大山情怀",
        poem_essay:
          "山，不语\n却道尽千年沧桑\n云，飘渺\n却承载万般梦想\n\n我立于此\n渺小如尘\n却感受到无限的力量\n在这苍茫与永恒之间",
      };

      setInspirationSentence(newContent.inspiration_sentence);
      setPromotionParagraph(newContent.promotion_paragraph);
      setSocialMediaTags(newContent.social_media_tags);
      setPoemEssay(newContent.poem_essay);

      setIsLoading(false);
      showToastMessage("文案已重新生成");
    }, 2000);
  };

  const handleCopyContent = (content: string, type: string) => {
    console.log(`Copying ${type}:`, content);
    setIsCopyModalVisible(false);
    showToastMessage(`${type}已复制`);
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  if (!photoData) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#38BDF8" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <FontAwesome6 name="arrow-left" size={18} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>编辑文案</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveContent}>
          <Text style={styles.saveButtonText}>保存</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.photoThumbnailContainer}>
          <View style={styles.photoThumbnail}>
            <Image
              source={{ uri: photoData.thumbnail }}
              style={styles.thumbnailImage}
            />
          </View>
        </View>

        <View style={styles.contentEditContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>一句话灵感</Text>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                value={inspirationSentence}
                onChangeText={setInspirationSentence}
                multiline
                numberOfLines={2}
                maxLength={30}
                placeholder="输入一句话灵感"
                placeholderTextColor="#94A3B8"
              />
              <Text style={styles.characterCount}>{inspirationCount}/30</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>一段话宣传</Text>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={[styles.textArea, styles.textAreaLarge]}
                value={promotionParagraph}
                onChangeText={setPromotionParagraph}
                multiline
                numberOfLines={4}
                maxLength={150}
                placeholder="输入一段话宣传"
                placeholderTextColor="#94A3B8"
              />
              <Text style={styles.characterCount}>{paragraphCount}/150</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>社交媒体Tag</Text>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                value={socialMediaTags}
                onChangeText={setSocialMediaTags}
                multiline
                numberOfLines={2}
                placeholder="输入社交媒体标签，用#分隔"
                placeholderTextColor="#94A3B8"
              />
              <Text style={styles.characterCount}>{tagsCount}个标签</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>诗歌/散文</Text>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={[styles.textArea, styles.textAreaLarge]}
                value={poemEssay}
                onChangeText={setPoemEssay}
                multiline
                numberOfLines={5}
                maxLength={100}
                placeholder="输入诗歌或散文"
                placeholderTextColor="#94A3B8"
              />
              <Text style={styles.characterCount}>{poemCount}/100</Text>
            </View>
          </View>
        </View>

        <ParameterSection
          isExpanded={isParameterExpanded}
          toggleExpanded={() => setIsParameterExpanded(!isParameterExpanded)}
          languageStyle={languageStyle}
          setLanguageStyle={setLanguageStyle}
          language={language}
          setLanguage={setLanguage}
          socialPlatform={socialPlatform}
          setSocialPlatform={setSocialPlatform}
          wordCount={wordCount}
          setWordCount={setWordCount}
          emotionalTendency={emotionalTendency}
          setEmotionalTendency={setEmotionalTendency}
          keywordsPreference={keywordsPreference}
          setKeywordsPreference={setKeywordsPreference}
        />

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={styles.regenerateButton}
          onPress={handleRegenerateContent}
        >
          <FontAwesome5 name="sync-alt" size={16} style={styles.buttonIcon} />
          <Text style={styles.regenerateButtonText}>重新生成</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.copyButton}
          onPress={() => setIsCopyModalVisible(true)}
        >
          <FontAwesome6 name="copy" size={16} style={styles.buttonIcon} />
          <Text style={styles.copyButtonText}>复制文案</Text>
        </TouchableOpacity>
      </View>

      <CopyOptionsModal
        visible={isCopyModalVisible}
        onClose={() => setIsCopyModalVisible(false)}
        onCopyInspiration={() =>
          handleCopyContent(inspirationSentence, "一句话灵感")
        }
        onCopyParagraph={() =>
          handleCopyContent(promotionParagraph, "一段话宣传")
        }
        onCopyTags={() => handleCopyContent(socialMediaTags, "社交媒体Tag")}
        onCopyPoem={() => handleCopyContent(poemEssay, "诗歌/散文")}
        onCopyAll={() =>
          handleCopyContent(
            `${inspirationSentence}\n\n${promotionParagraph}\n\n${socialMediaTags}\n\n${poemEssay}`,
            "全部内容"
          )
        }
      />

      <Modal transparent visible={isLoading} animationType="fade">
        <View style={styles.loadingModalContainer}>
          <View style={styles.loadingModalContent}>
            <ActivityIndicator size="large" color="#38BDF8" />
            <Text style={styles.loadingText}>正在重新生成文案...</Text>
          </View>
        </View>
      </Modal>

      <ToastMessage visible={showToast} message={toastMessage} />
    </SafeAreaView>
  );
};

export default AIEditScreen;
