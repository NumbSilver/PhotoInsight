import { StyleSheet, Dimensions, Platform } from 'react-native';


const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // primary
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A', // primary
  },
  loadingText: {
    marginTop: 12,
    color: '#E2E8F0', // lightText
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0F172A', // primary
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100, // Extra padding for bottom actions
  },
  photoContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 16,
  },
  photo: {
    width: '100%',
    height: width * 0.75, // Aspect ratio
    borderRadius: 8,
  },
  swipeIndicator: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0, // Hidden by default
  },
  swipeLeft: {
    left: 10,
  },
  swipeRight: {
    right: 10,
  },
  contentContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  sectionContainer: {
    borderRadius: 16,
    backgroundColor: 'rgba(30, 41, 59, 0.7)', // secondary with opacity
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
        backgroundColor: 'rgba(30, 41, 59, 1.0)', // Solid color for Android with elevation
      },
    }),
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#38BDF8', // accent
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedbackButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16, // Account for iOS home indicator
    backgroundColor: '#0B1121', // darkBg
    borderTopWidth: 1,
    borderTopColor: '#1E293B', // secondary
    gap: 12,
  },
  regenerateButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E293B', // secondary
    paddingVertical: 12,
    borderRadius: 12,
  },
  copyButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38BDF8', // accent
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  copyOptionsContainer: {
    backgroundColor: '#0B1121', // darkBg
    borderTopWidth: 1,
    borderTopColor: '#1E293B', // secondary
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16, // Account for iOS home indicator
  },
  copyOptionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  copyOptionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E2E8F0', // lightText
  },
  copyOptionsList: {
    gap: 12,
  },
  copyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B', // secondary
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  copyOptionIcon: {
    marginRight: 8,
  },
  copyOptionText: {
    color: '#E2E8F0', // lightText
    fontSize: 15,
    fontWeight: '500',
  },
  copyAllOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#38BDF8', // accent
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  copyAllOptionText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  regeneratingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.8)', // primary with opacity
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
  regeneratingContent: {
    alignItems: 'center',
  },
  regeneratingSpinner: {
    marginBottom: 16,
  },
  regeneratingText: {
    fontSize: 18,
    color: '#E2E8F0', // lightText
  },
});

export default styles;