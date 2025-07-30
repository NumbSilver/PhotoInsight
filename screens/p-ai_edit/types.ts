
export interface Parameters {
  language_style: string;
  language: string;
  social_platform: string;
  word_count: string;
  emotional_tendency: string;
  keywords_preference: string;
}

export interface ContentData {
  inspiration_sentence: string;
  promotion_paragraph: string;
  social_media_tags: string;
  poem_essay: string;
  parameters: Parameters;
}

export interface PhotoData {
  thumbnail: string;
  content: ContentData;
}

export interface ParameterSectionProps {
  isExpanded: boolean;
  toggleExpanded: () => void;
  languageStyle: string;
  setLanguageStyle: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  socialPlatform: string;
  setSocialPlatform: (value: string) => void;
  wordCount: string;
  setWordCount: (value: string) => void;
  emotionalTendency: string;
  setEmotionalTendency: (value: string) => void;
  keywordsPreference: string;
  setKeywordsPreference: (value: string) => void;
}

export interface CopyOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onCopyInspiration: () => void;
  onCopyParagraph: () => void;
  onCopyTags: () => void;
  onCopyPoem: () => void;
  onCopyAll: () => void;
}

export interface ToastMessageProps {
  visible: boolean;
  message: string;
}

export interface SelectOptionProps {
  label: string;
  value: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  onValueChange: (value: string) => void;
}
