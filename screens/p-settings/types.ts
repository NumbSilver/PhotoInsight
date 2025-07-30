
// 定义设置页面所需的类型

// 设置项类型
export type SettingItemType = {
  id: string;
  title: string;
  subtitle: string;
  type: 'navigation' | 'toggle';
  value?: boolean;
};

// 设置组类型
export type SettingGroupType = {
  id: string;
  title: string;
  items: SettingItemType[];
};

// 语言风格选项
export type LanguageStyleOption = 'formal' | 'casual' | 'literary' | 'professional';

// 社交媒体平台选项
export type SocialPlatformOption = 'xiaohongshu' | 'weibo' | 'wechat' | 'douyin';

// 情感倾向选项
export type EmotionalTendencyOption = 'positive' | 'neutral' | 'negative';

// 字数范围选项
export type WordCountOption = '30-50' | '50-100' | '100-200' | '200-500';
