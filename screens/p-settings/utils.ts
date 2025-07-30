import { Platform } from 'react-native';
import { SettingGroupType } from './types';


export const getSettingsData = (): SettingGroupType[] => {
  return [
    {
      id: 'default-settings',
      title: '默认文案设置',
      items: [
        {
          id: 'language-style',
          title: '默认语言风格',
          subtitle: '文艺',
          type: 'navigation',
        },
        {
          id: 'social-platform',
          title: '默认社交媒体平台',
          subtitle: '小红书',
          type: 'navigation',
        },
        {
          id: 'word-count',
          title: '默认一段话字数',
          subtitle: '50-100字',
          type: 'navigation',
        },
        {
          id: 'emotional-tendency',
          title: '默认情感倾向',
          subtitle: '积极',
          type: 'navigation',
        },
        {
          id: 'keywords-preference',
          title: '默认关键词偏好',
          subtitle: '旅行, 美食, 风景',
          type: 'navigation',
        },
      ],
    },
    {
      id: 'notification-settings',
      title: '通知设置',
      items: [
        {
          id: 'notifications',
          title: '通知',
          subtitle: '接收应用通知',
          type: 'toggle',
          value: true,
        },
      ],
    },
    {
      id: 'privacy-settings',
      title: '隐私设置',
      items: [
        {
          id: 'privacy',
          title: '隐私设置',
          subtitle: '管理个人数据和隐私',
          type: 'navigation',
        },
      ],
    },
    {
      id: 'about-app',
      title: '关于',
      items: [
        {
          id: 'about',
          title: '关于 PhotoInsight',
          subtitle: '版本 1.0.0',
          type: 'navigation',
        },
      ],
    },
  ];
};

export const isIOS = Platform.OS === 'ios';

export const showToast = (message: string) => {
  console.log(`Toast: ${message}`);
};