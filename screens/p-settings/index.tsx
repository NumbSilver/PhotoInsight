
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';

import styles from './styles';
import SettingItem from './components/SettingItem';

const SettingsScreen = () => {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handleBackPress = () => {
    router.back();
  };

  const handleToggleNotifications = (value: boolean) => {
    setNotificationsEnabled(value);
  };

  const handleSettingItemPress = (settingType: string) => {
    // 在实际应用中，这里会导航到相应的设置页面
    console.log(`Navigate to ${settingType} settings`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <FontAwesome6 name="chevron-left" size={18} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>设置</Text>
      </View>

      {/* 主内容区域 */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* 默认文案设置组 */}
        <View style={styles.settingsGroup}>
          <Text style={styles.settingsGroupTitle}>默认文案设置</Text>
          
          <SettingItem
            title="默认语言风格"
            subtitle="文艺"
            onPress={() => handleSettingItemPress('languageStyle')}
          />
          
          <SettingItem
            title="默认社交媒体平台"
            subtitle="小红书"
            onPress={() => handleSettingItemPress('socialPlatform')}
          />
          
          <SettingItem
            title="默认一段话字数"
            subtitle="50-100字"
            onPress={() => handleSettingItemPress('wordCount')}
          />
          
          <SettingItem
            title="默认情感倾向"
            subtitle="积极"
            onPress={() => handleSettingItemPress('emotionalTendency')}
          />
          
          <SettingItem
            title="默认关键词偏好"
            subtitle="旅行, 美食, 风景"
            onPress={() => handleSettingItemPress('keywordsPreference')}
            isLast={true}
          />
        </View>
        
        {/* 通知设置组 */}
        <View style={styles.settingsGroup}>
          <Text style={styles.settingsGroupTitle}>通知设置</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>通知</Text>
              <Text style={styles.settingSubtitle}>接收应用通知</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggleNotifications}
              trackColor={{ false: '#2D3748', true: '#38BDF8' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#2D3748"
            />
          </View>
        </View>
        
        {/* 隐私设置组 */}
        <View style={styles.settingsGroup}>
          <Text style={styles.settingsGroupTitle}>隐私设置</Text>
          
          <SettingItem
            title="隐私设置"
            subtitle="管理个人数据和隐私"
            onPress={() => handleSettingItemPress('privacy')}
            isLast={true}
          />
        </View>
        
        {/* 关于应用 */}
        <View style={styles.settingsGroup}>
          <Text style={styles.settingsGroupTitle}>关于</Text>
          
          <SettingItem
            title="关于 PhotoInsight"
            subtitle="版本 1.0.0"
            onPress={() => handleSettingItemPress('about')}
            isLast={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
