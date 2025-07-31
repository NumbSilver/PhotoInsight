import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A", // primary color
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 100, // Extra padding to account for bottom navigation
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100, // Extra padding to account for bottom navigation
  },
});

export default styles;
