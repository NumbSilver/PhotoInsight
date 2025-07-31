import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const gap = 6; // Gap between items
const itemsPerRow = 3;
const totalGapWidth = gap * (itemsPerRow - 1);
const itemWidth = (width - 16 - totalGapWidth) / itemsPerRow; // 16 is the horizontal padding (8 on each side)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: gap,
  },
  emptyItem: {
    width: itemWidth,
    aspectRatio: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#94A3B8",
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
});

export default styles;
