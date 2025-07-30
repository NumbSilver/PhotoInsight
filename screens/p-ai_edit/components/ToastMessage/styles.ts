import { StyleSheet, Platform } from 'react-native';


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    backgroundColor: '#38BDF8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
        backgroundColor: '#38BDF8',
      },
    }),
  },
  message: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default styles;