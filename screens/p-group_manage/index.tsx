
import React, { useState, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Modal, FlatList, Pressable, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import styles from './styles';
import GroupItem from './components/GroupItem';
import Toast from './components/Toast';
import { Group } from './types';


const GroupManageScreen = () => {
  const router = useRouter();
  const [isNewGroupModalVisible, setIsNewGroupModalVisible] = useState(false);
  const [isGroupActionMenuVisible, setIsGroupActionMenuVisible] = useState(false);
  const [isEditGroupModalVisible, setIsEditGroupModalVisible] = useState(false);
  const [isDeleteConfirmModalVisible, setIsDeleteConfirmModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [editGroupName, setEditGroupName] = useState('');
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const [manualGroups, setManualGroups] = useState<Group[]>([
    {
      id: 'group-1',
      name: '旅行',
      photoCount: 12,
      coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      isAI: false,
    },
    {
      id: 'group-2',
      name: '家人',
      photoCount: 24,
      coverImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
      isAI: false,
    },
    {
      id: 'group-3',
      name: '朋友聚会',
      photoCount: 8,
      coverImage: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be',
      isAI: false,
    },
  ]);

  const [aiGroups, setAiGroups] = useState<Group[]>([
    {
      id: 'ai-group-1',
      name: '美食',
      photoCount: 8,
      coverImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
      isAI: true,
    },
    {
      id: 'ai-group-2',
      name: '城市风景',
      photoCount: 15,
      coverImage: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
      isAI: true,
    },
    {
      id: 'ai-group-3',
      name: '宠物',
      photoCount: 6,
      coverImage: 'https://images.unsplash.com/photo-1557800636-894a64c1696f',
      isAI: true,
    },
  ]);

  const handleBackPress = useCallback(() => {
    router.back();
  }, [router]);

  const handleNewGroupPress = useCallback(() => {
    setGroupName('');
    setIsNewGroupModalVisible(true);
  }, []);

  const handleGroupMenuPress = useCallback((group: Group) => {
    setCurrentGroup(group);
    setIsGroupActionMenuVisible(true);
  }, []);

  const handleGroupPress = useCallback((group: Group) => {
    router.push(`/p-album_home?group_id=${group.id}`);
  }, [router]);

  const handleEditGroupNamePress = useCallback(() => {
    if (currentGroup) {
      setEditGroupName(currentGroup.name);
      setIsGroupActionMenuVisible(false);
      setIsEditGroupModalVisible(true);
    }
  }, [currentGroup]);

  const handleViewGroupPhotosPress = useCallback(() => {
    if (currentGroup) {
      setIsGroupActionMenuVisible(false);
      router.push(`/p-album_home?group_id=${currentGroup.id}`);
    }
  }, [currentGroup, router]);

  const handleDeleteGroupPress = useCallback(() => {
    setIsGroupActionMenuVisible(false);
    setIsDeleteConfirmModalVisible(true);
  }, []);

  const handleConfirmNewGroup = useCallback(() => {
    if (groupName.trim()) {
      const newGroup: Group = {
        id: `group-${Date.now()}`,
        name: groupName.trim(),
        photoCount: 0,
        coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        isAI: false,
      };
      setManualGroups(prevGroups => [newGroup, ...prevGroups]);
      setIsNewGroupModalVisible(false);
      showToast('分组创建成功');
    }
  }, [groupName]);

  const handleConfirmEditGroup = useCallback(() => {
    if (currentGroup && editGroupName.trim()) {
      if (currentGroup.isAI) {
        setAiGroups(prevGroups =>
          prevGroups.map(group =>
            group.id === currentGroup.id
              ? { ...group, name: editGroupName.trim() }
              : group
          )
        );
      } else {
        setManualGroups(prevGroups =>
          prevGroups.map(group =>
            group.id === currentGroup.id
              ? { ...group, name: editGroupName.trim() }
              : group
          )
        );
      }
      setIsEditGroupModalVisible(false);
      showToast('分组名称已更新');
    }
  }, [currentGroup, editGroupName]);

  const handleConfirmDelete = useCallback(() => {
    if (currentGroup) {
      if (currentGroup.isAI) {
        setAiGroups(prevGroups =>
          prevGroups.filter(group => group.id !== currentGroup.id)
        );
      } else {
        setManualGroups(prevGroups =>
          prevGroups.filter(group => group.id !== currentGroup.id)
        );
      }
      setIsDeleteConfirmModalVisible(false);
      showToast('分组已删除');
    }
  }, [currentGroup]);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3000);
  }, []);

  const renderGroupItem = useCallback(
    ({ item }: { item: Group }) => (
      <GroupItem
        group={item}
        onPress={() => handleGroupPress(item)}
        onMenuPress={() => handleGroupMenuPress(item)}
      />
    ),
    [handleGroupPress, handleGroupMenuPress]
  );

  const renderManualGroupsHeader = useCallback(() => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>我的分组</Text>
    </View>
  ), []);

  const renderAiGroupsHeader = useCallback(() => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>AI智能分组</Text>
    </View>
  ), []);

  const renderWatermark = useCallback(() => (
    <View style={styles.watermark}>
      <Text style={styles.watermarkText}>整理照片，记录美好时光</Text>
    </View>
  ), []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <FontAwesome6 name="chevron-left" size={18} color="#E2E8F0" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>分组管理</Text>
        </View>
        <TouchableOpacity
          style={styles.newGroupButton}
          onPress={handleNewGroupPress}
          activeOpacity={0.7}
        >
          <FontAwesome6 name="plus" size={16} color="#38BDF8" style={styles.newGroupIcon} />
          <Text style={styles.newGroupText}>新建分组</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[]}
        renderItem={({ item }) => null}
        ListHeaderComponent={
          <>
            {renderWatermark()}
            
            {renderManualGroupsHeader()}
            <FlatList
              data={manualGroups}
              renderItem={renderGroupItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.groupsList}
            />
            
            {renderAiGroupsHeader()}
            <FlatList
              data={aiGroups}
              renderItem={renderGroupItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.groupsList}
            />
          </>
        }
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      />

      <Modal
        visible={isNewGroupModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsNewGroupModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setIsNewGroupModalVisible(false)}
          />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>新建分组</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>分组名称</Text>
              <TextInput
                style={styles.input}
                placeholder="请输入分组名称"
                placeholderTextColor="#94A3B8"
                value={groupName}
                onChangeText={setGroupName}
              />
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsNewGroupModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmNewGroup}
              >
                <Text style={styles.confirmButtonText}>确认</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isGroupActionMenuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsGroupActionMenuVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setIsGroupActionMenuVisible(false)}
          />
          <View style={styles.actionMenuContent}>
            <View style={styles.actionMenuHeader}>
              <Text style={styles.actionMenuTitle}>分组操作</Text>
              <TouchableOpacity
                style={styles.closeMenuButton}
                onPress={() => setIsGroupActionMenuVisible(false)}
              >
                <FontAwesome5 name="times" size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>
            <View style={styles.actionMenuOptions}>
              <TouchableOpacity
                style={styles.actionMenuItem}
                onPress={handleEditGroupNamePress}
              >
                <FontAwesome5 name="edit" size={18} color="#38BDF8" style={styles.actionMenuIcon} />
                <Text style={styles.actionMenuText}>编辑名称</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionMenuItem}
                onPress={handleViewGroupPhotosPress}
              >
                <FontAwesome6 name="images" size={18} color="#38BDF8" style={styles.actionMenuIcon} />
                <Text style={styles.actionMenuText}>查看照片</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionMenuItem}
                onPress={handleDeleteGroupPress}
              >
                <FontAwesome5 name="trash-alt" size={18} color="#EF4444" style={styles.actionMenuIcon} />
                <Text style={styles.actionMenuTextDanger}>删除分组</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isEditGroupModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsEditGroupModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setIsEditGroupModalVisible(false)}
          />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>编辑分组名称</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>分组名称</Text>
              <TextInput
                style={styles.input}
                placeholder="请输入新的分组名称"
                placeholderTextColor="#94A3B8"
                value={editGroupName}
                onChangeText={setEditGroupName}
              />
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsEditGroupModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmEditGroup}
              >
                <Text style={styles.confirmButtonText}>确认</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isDeleteConfirmModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDeleteConfirmModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setIsDeleteConfirmModalVisible(false)}
          />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>删除分组</Text>
            <Text style={styles.modalDescription}>
              确定要删除这个分组吗？分组内的照片不会被删除。
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsDeleteConfirmModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.deleteButtonText}>删除</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Toast
        visible={isToastVisible}
        message={toastMessage}
      />
    </SafeAreaView>
  );
};

export default GroupManageScreen;
