import { StyleSheet, Platform } from 'react-native';


const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 80, // Positioned above the bottom navigation
    zIndex: 10,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#38BDF8', // accent color
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(56, 189, 248, 0.6)', // accent color with opacity
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
        backgroundColor: '#38BDF8', // accent color with full opacity for Android
      },
    }),
  },
});

export default styles;