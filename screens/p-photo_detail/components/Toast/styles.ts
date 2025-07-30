import { StyleSheet, Dimensions } from 'react-native';


const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: width / 2,
    transform: [{ translateX: -width / 4 }],
    backgroundColor: 'rgba(15, 23, 42, 0.9)', // primary with opacity
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 32,
    minWidth: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default styles;