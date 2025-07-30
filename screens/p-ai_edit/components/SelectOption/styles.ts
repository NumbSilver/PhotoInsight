import { StyleSheet, Platform, Dimensions } from 'react-native';


const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#38BDF8',
    marginBottom: 8,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#94A3B8',
    borderRadius: 8,
    padding: 12,
  },
  selectedText: {
    color: '#E2E8F0',
    fontSize: 15,
  },
  icon: {
    color: '#94A3B8',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: height * 0.7,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
        backgroundColor: '#1E293B',
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#0F172A',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E2E8F0',
  },
  closeIcon: {
    color: '#94A3B8',
    padding: 4,
  },
  optionsList: {
    paddingHorizontal: 16,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#0F172A',
  },
  selectedOption: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
  },
  optionText: {
    fontSize: 16,
    color: '#E2E8F0',
  },
  selectedOptionText: {
    color: '#38BDF8',
    fontWeight: '500',
  },
  checkIcon: {
    color: '#38BDF8',
  },
});

export default styles;