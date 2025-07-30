import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B', // secondary
    borderRadius: 12,
    padding: 16,
  },
  notLastItem: {
    marginBottom: 8,
  },
  lastItem: {
    marginBottom: 0,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E2E8F0', // lightText
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8', // darkText
    marginTop: 4,
  },
  icon: {
    color: '#94A3B8', // darkText
  },
});

export default styles;