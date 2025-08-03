import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: "rgba(30, 41, 59, 0.7)", // secondary with opacity
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
        backgroundColor: "rgba(30, 41, 59, 1.0)", // Solid color for Android with elevation
      },
    }),
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#38BDF8", // accent
    marginBottom: 8,
  },
  content: {
    fontSize: 15,
    lineHeight: 22,
    color: "#E2E8F0", // lightText
    marginBottom: 12,
  },
  poemContent: {
    fontStyle: "italic",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  feedbackButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  editContainer: {
    marginBottom: 12,
  },
  editInput: {
    backgroundColor: "#334155",
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: "#F1F5F9",
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 8,
  },
  poemEditInput: {
    minHeight: 120,
    lineHeight: 22,
  },
  editActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelEditButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#475569",
    alignItems: "center",
    justifyContent: "center",
  },
  saveEditButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
