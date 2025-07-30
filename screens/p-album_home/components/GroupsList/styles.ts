import { StyleSheet, Platform } from 'react-native';


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  groupItem: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1E293B', // secondary color
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
        backgroundColor: '#1E293B', // secondary color with full opacity for Android
      },
    }),
  },
  groupImageContainer: {
    aspectRatio: 16 / 9, // video aspect ratio
    position: 'relative',
  },
  groupImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  groupInfo: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  groupTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  groupPhotoCount: {
    color: '#E2E8F0', // lightText color
    fontSize: 14,
    marginTop: 2,
  },
  aiTag: {
    backgroundColor: 'rgba(56, 189, 248, 0.8)', // accent color with opacity
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999, // Full rounded corners
  },
  aiTagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default styles;