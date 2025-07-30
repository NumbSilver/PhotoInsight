
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { ParameterSectionProps } from '../../types';
import styles from './styles';
import SelectOption from '../SelectOption';

const ParameterSection: React.FC<ParameterSectionProps> = ({
  isExpanded,
  toggleExpanded,
  languageStyle,
  setLanguageStyle,
  language,
  setLanguage,
  socialPlatform,
  setSocialPlatform,
  wordCount,
  setWordCount,
  emotionalTendency,
  setEmotionalTendency,
  keywordsPreference,
  setKeywordsPreference,
}) => {
  // Language style options
  const languageStyleOptions = [
    { label: '正式', value: 'formal' },
    { label: '随性', value: 'casual' },
    { label: '幽默', value: 'humorous' },
    { label: '文艺', value: 'poetic' },
    { label: '专业', value: 'professional' },
  ];

  // Language options
  const languageOptions = [
    { label: '中文', value: 'zh' },
    { label: '英文', value: 'en' },
    { label: '日文', value: 'jp' },
    { label: '韩文', value: 'kr' },
  ];

  // Social platform options
  const socialPlatformOptions = [
    { label: '微信朋友圈', value: 'weixin' },
    { label: '小红书', value: 'xiaohongshu' },
    { label: '微博', value: 'weibo' },
    { label: '抖音', value: 'douyin' },
    { label: 'Instagram', value: 'instagram' },
  ];

  // Word count options
  const wordCountOptions = [
    { label: '50-80字', value: '50-80' },
    { label: '80-120字', value: '80-120' },
    { label: '120-150字', value: '120-150' },
    { label: '150-200字', value: '150-200' },
  ];

  // Emotional tendency options
  const emotionalTendencyOptions = [
    { label: '积极', value: 'positive' },
    { label: '中性', value: 'neutral' },
    { label: '怀旧', value: 'nostalgic' },
    { label: '幽默', value: 'humorous' },
    { label: '专业', value: 'professional' },
    { label: '感伤', value: 'emotional' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.toggleButton} 
        onPress={toggleExpanded}
        activeOpacity={0.7}
      >
        <Text style={styles.toggleButtonText}>参数设置</Text>
        <FontAwesome6 
          name={isExpanded ? 'chevron-up' : 'chevron-down'} 
          size={14} 
          style={styles.toggleIcon} 
        />
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.parametersContent}>
          <SelectOption
            label="语言风格"
            value={languageStyle}
            options={languageStyleOptions}
            onValueChange={setLanguageStyle}
          />
          
          <SelectOption
            label="语言"
            value={language}
            options={languageOptions}
            onValueChange={setLanguage}
          />
          
          <SelectOption
            label="社交媒体平台"
            value={socialPlatform}
            options={socialPlatformOptions}
            onValueChange={setSocialPlatform}
          />
          
          <SelectOption
            label="一段话字数"
            value={wordCount}
            options={wordCountOptions}
            onValueChange={setWordCount}
          />
          
          <SelectOption
            label="情感倾向"
            value={emotionalTendency}
            options={emotionalTendencyOptions}
            onValueChange={setEmotionalTendency}
          />
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>关键词偏好</Text>
            <TextInput
              style={styles.textInput}
              value={keywordsPreference}
              onChangeText={setKeywordsPreference}
              placeholder="输入关键词，用逗号分隔"
              placeholderTextColor="#94A3B8"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ParameterSection;
