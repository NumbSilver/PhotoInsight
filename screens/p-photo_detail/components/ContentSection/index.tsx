import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./styles";
import ActionButton from "../ActionButton";

interface ContentSectionProps {
  title: string;
  content: string;
  isPoem?: boolean;
  isLiked?: boolean;
  isDisliked?: boolean;
  onLike: () => void;
  onDislike: () => void;
  onEdit: () => void;
  onRegenerate: () => void;
  onCopy: () => void;
  onSave?: (newContent: string) => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  content,
  isPoem = false,
  isLiked = false,
  isDisliked = false,
  onLike,
  onDislike,
  onRegenerate,
  onCopy,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(content);
  };

  const handleSave = () => {
    if (onSave && editedContent.trim()) {
      onSave(editedContent.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={[styles.editInput, isPoem && styles.poemEditInput]}
            value={editedContent}
            onChangeText={setEditedContent}
            placeholder={`请输入${title}内容...`}
            placeholderTextColor="#94A3B8"
            multiline
            textAlignVertical="top"
            autoFocus
          />
          <View style={styles.editActions}>
            <TouchableOpacity
              style={styles.cancelEditButton}
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <FontAwesome5 name="times" size={16} color="#94A3B8" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveEditButton}
              onPress={handleSave}
              activeOpacity={0.7}
            >
              <FontAwesome5 name="check" size={16} color="#10B981" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={[styles.content, isPoem && styles.poemContent]}>
          {content}
        </Text>
      )}

      <View style={styles.actionContainer}>
        <View style={styles.feedbackButtons}>
          <ActionButton
            icon="thumbs-up"
            isActive={isLiked}
            activeColor="#10B981"
            onPress={onLike}
          />
          <ActionButton
            icon="thumbs-down"
            isActive={isDisliked}
            activeColor="#EF4444"
            onPress={onDislike}
          />
        </View>

        <View style={styles.actionButtons}>
          <ActionButton icon="edit" onPress={handleEdit} />
          <ActionButton icon="sync-alt" onPress={onRegenerate} />
          <ActionButton icon="copy" isAccent onPress={onCopy} />
        </View>
      </View>
    </View>
  );
};

export default ContentSection;
