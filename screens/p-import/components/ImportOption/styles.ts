import { StyleSheet, Platform } from "react-native";

const colors = {
  primary: "#0F172A", // 主色调
  secondary: "#1E293B", // 辅助色
  accent: "#38BDF8", // 强调色
  darkBg: "#0B1121", // 更深的背景色
  lightText: "#E2E8F0", // 浅色文本
  darkText: "#94A3B8", // 深色文本
};

export default StyleSheet.create({
  container: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
        backgroundColor: colors.secondary,
      },
    }),
  },
  touchable: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    aspectRatio: 16 / 9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.darkBg,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.7,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: "transparent",
    opacity: 0.8,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  icon: {
    fontSize: 48,
    color: colors.accent,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  descriptionContainer: {
    padding: 16,
  },
  description: {
    fontSize: 14,
    color: colors.darkText,
  },
});
