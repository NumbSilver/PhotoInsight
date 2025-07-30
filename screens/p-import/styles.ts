import { StyleSheet, Platform, Dimensions } from 'react-native';


const { width } = Dimensions.get('window');

const colors = {
  primary: '#0F172A',      // 主色调
  secondary: '#1E293B',    // 辅助色
  accent: '#38BDF8',       // 强调色
  darkBg: '#0B1121',       // 更深的背景色
  lightText: '#E2E8F0',    // 浅色文本
  darkText: '#94A3B8',     // 深色文本
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
        backgroundColor: colors.primary,
      },
    }),
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backIcon: {
    fontSize: 18,
    color: colors.lightText,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.lightText,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  watermarkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginBottom: 24,
  },
  watermarkText: {
    fontSize: 12,
    color: colors.darkText,
    opacity: 0.7,
    textAlign: 'center',
  },
  hintContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  hintText: {
    fontSize: 12,
    color: colors.darkText,
    textAlign: 'center',
  },
});