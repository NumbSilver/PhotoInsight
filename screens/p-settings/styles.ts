import { StyleSheet, Platform } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // primary
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0F172A', // primary
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
        backgroundColor: '#0F172A', // primary with full opacity for Android
      },
    }),
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backIcon: {
    color: '#E2E8F0', // lightText
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#E2E8F0', // lightText
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  settingsGroup: {
    marginBottom: 24,
  },
  settingsGroupTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94A3B8', // darkText
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B', // secondary
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E2E8F0', // lightText
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#94A3B8', // darkText
    marginTop: 4,
  },
});

export default styles;