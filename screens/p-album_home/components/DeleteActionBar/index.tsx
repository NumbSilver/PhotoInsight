import { View, Text, TouchableOpacity, Alert } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import styles from "./styles";

interface DeleteActionBarProps {
  selectedCount: number;
  onCancel: () => void;
  onDelete: () => void;
  onSelectAll: () => void;
  isAllSelected: boolean;
}

const DeleteActionBar = ({
  selectedCount,
  onCancel,
  onDelete,
  onSelectAll,
  isAllSelected,
}: DeleteActionBarProps) => {
  const handleDelete = () => {
    if (selectedCount === 0) return;

    Alert.alert(
      "确认删除",
      `确定要删除选中的 ${selectedCount} 张照片吗？此操作无法撤销。`,
      [
        {
          text: "取消",
          style: "cancel",
        },
        {
          text: "删除",
          style: "destructive",
          onPress: onDelete,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <FontAwesome6 name="times" style={styles.cancelIcon} />
        </TouchableOpacity>
        <Text style={styles.selectedText}>已选择 {selectedCount} 张照片</Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.selectAllButton} onPress={onSelectAll}>
          <Text style={styles.selectAllText}>
            {isAllSelected ? "取消全选" : "全选"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.deleteButton,
            selectedCount === 0 && styles.deleteButtonDisabled,
          ]}
          onPress={handleDelete}
          disabled={selectedCount === 0}
        >
          <FontAwesome6 name="trash" style={styles.deleteIcon} />
          <Text style={styles.deleteText}>删除</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteActionBar;
