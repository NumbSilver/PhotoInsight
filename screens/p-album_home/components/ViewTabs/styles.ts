import { StyleSheet, Platform } from 'react-native';


const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E293B', // secondary color
    borderRadius: 9999, // Full rounded corners
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
        backgroundColor: '#1E293B', // secondary color with full opacity for Android
      },
    }),
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999, // Full rounded corners
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
  },
  tabText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#38BDF8', // accent color
  },
  inactiveTabText: {
    color: '#94A3B8', // darkText color
  },
  indicator: {
    position: 'absolute',
    bottom: -2,
    width: '50%',
    height: 3,
    backgroundColor: '#38BDF8', // accent color
    borderRadius: 3,
    alignSelf: 'center',
  },
});

export default styles;