import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");
const gap = 6; // Gap between items
const itemsPerRow = 3;
const totalGapWidth = gap * (itemsPerRow - 1);
const itemWidth = (width - 16 - totalGapWidth) / itemsPerRow; // 16 is the horizontal padding (8 on each side)

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    aspectRatio: 1,
  },
  touchable: {
    flex: 1,
  },
  photoContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#1E293B", // secondary color
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
        backgroundColor: "#1E293B", // secondary color with full opacity for Android
      },
    }),
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  captionContainer: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  caption: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  loadingContainer: {
    backgroundColor: "#1E293B", // secondary color
  },
  selectionIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  selectedIndicator: {
    backgroundColor: "#38BDF8", // accent color
  },
  unselectedIndicator: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  checkmark: {
    width: 10,
    height: 5,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: "white",
    transform: [{ rotate: "-45deg" }],
  },
  deleteOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteIcon: {
    width: 16,
    height: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
});

export default styles;
