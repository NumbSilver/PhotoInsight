import { StyleSheet, Platform } from 'react-native';


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  toggleButtonText: {
    color: '#E2E8F0',
    fontWeight: '500',
    fontSize: 15,
  },
  toggleIcon: {
    color: '#94A3B8',
  },
  parametersContent: {
    backgroundColor: '#1E293B',
    borderRadius: 8,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
        backgroundColor: '#1E293B',
      },
    }),
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#38BDF8',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#94A3B8',
    borderRadius: 8,
    color: '#E2E8F0',
    padding: 12,
    fontSize: 15,
  },
});

export default styles;