import { StyleSheet, Platform, Dimensions } from 'react-native';


const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0F172A',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
        backgroundColor: '#0F172A',
      },
    }),
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    color: '#E2E8F0',
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E2E8F0',
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    color: '#38BDF8',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100, // Extra padding for bottom action buttons
  },
  photoThumbnailContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  photoThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1E293B',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  contentEditContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#38BDF8',
    marginBottom: 4,
  },
  textAreaContainer: {
    position: 'relative',
  },
  textArea: {
    backgroundColor: '#1E293B',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E293B',
    color: '#E2E8F0',
    padding: 12,
    fontSize: 15,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  textAreaLarge: {
    minHeight: 120,
  },
  characterCount: {
    position: 'absolute',
    bottom: 8,
    right: 12,
    fontSize: 12,
    color: '#94A3B8',
  },
  bottomSpacing: {
    height: 20,
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#0B1121',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 8,
        backgroundColor: '#0B1121',
      },
    }),
  },
  regenerateButton: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  regenerateButtonText: {
    color: '#E2E8F0',
    fontWeight: '500',
    marginLeft: 8,
  },
  copyButton: {
    flex: 1,
    backgroundColor: '#38BDF8',
    borderRadius: 8,
    paddingVertical: 12,
    marginLeft: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 8,
  },
  buttonIcon: {
    color: '#FFFFFF',
  },
  loadingModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingModalContent: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
        backgroundColor: '#1E293B',
      },
    }),
  },
  loadingText: {
    color: '#E2E8F0',
    marginTop: 16,
    fontSize: 16,
  },
});

export default styles;