import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E293B",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  cancelButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#475569",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cancelIcon: {
    fontSize: 14,
    color: "#E2E8F0",
  },
  selectedText: {
    fontSize: 16,
    color: "#E2E8F0",
    fontWeight: "500",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  selectAllText: {
    fontSize: 14,
    color: "#38BDF8",
    fontWeight: "500",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EF4444",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButtonDisabled: {
    backgroundColor: "#64748B",
  },
  deleteIcon: {
    fontSize: 14,
    color: "#FFFFFF",
    marginRight: 6,
  },
  deleteText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
  },
});

export default styles;
