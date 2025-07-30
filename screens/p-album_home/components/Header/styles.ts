import { StyleSheet, Platform } from 'react-native';


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#0F172A', // primary color
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
        backgroundColor: '#0F172A', // primary color with full opacity for Android
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#38BDF8', // accent color
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 16,
  },
});

export default styles;