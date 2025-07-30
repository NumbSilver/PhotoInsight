import { StyleSheet, Platform } from 'react-native';


const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
        backgroundColor: '#1E293B',
      },
    }),
  },
  imageContainer: {
    aspectRatio: 16 / 9,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backgroundImage: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7))',
  },
  contentContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  photoCount: {
    fontSize: 14,
    color: '#E2E8F0',
    opacity: 0.8,
  },
  menuButton: {
    padding: 8,
  },
  aiTag: {
    backgroundColor: 'rgba(56, 189, 248, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
  },
  aiTagText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default styles;