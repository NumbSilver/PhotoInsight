
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming 
} from 'react-native-reanimated';
import styles from './styles';

interface ViewTabsProps {
  activeTab: 'photos' | 'groups';
  onTabChange: (tab: 'photos' | 'groups') => void;
}

const ViewTabs = ({ activeTab, onTabChange }: ViewTabsProps) => {
  const handlePhotosPress = () => {
    onTabChange('photos');
  };

  const handleGroupsPress = () => {
    onTabChange('groups');
  };

  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity 
        style={[
          styles.tabButton, 
          activeTab === 'photos' ? styles.activeTab : null
        ]} 
        onPress={handlePhotosPress}
        activeOpacity={0.7}
      >
        <Text 
          style={[
            styles.tabText, 
            activeTab === 'photos' ? styles.activeTabText : styles.inactiveTabText
          ]}
        >
          所有照片
        </Text>
        {activeTab === 'photos' && <View style={styles.indicator} />}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.tabButton, 
          activeTab === 'groups' ? styles.activeTab : null
        ]} 
        onPress={handleGroupsPress}
        activeOpacity={0.7}
      >
        <Text 
          style={[
            styles.tabText, 
            activeTab === 'groups' ? styles.activeTabText : styles.inactiveTabText
          ]}
        >
          我的分组
        </Text>
        {activeTab === 'groups' && <View style={styles.indicator} />}
      </TouchableOpacity>
    </View>
  );
};

export default ViewTabs;
