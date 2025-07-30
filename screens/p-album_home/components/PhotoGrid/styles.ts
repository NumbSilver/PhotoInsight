import { StyleSheet, Dimensions } from 'react-native';


const { width } = Dimensions.get('window');
const gap = 6; // Gap between items
const itemsPerRow = 3;
const totalGapWidth = gap * (itemsPerRow - 1);
const itemWidth = (width - 16 - totalGapWidth) / itemsPerRow; // 16 is the horizontal padding (8 on each side)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: gap,
  },
  emptyItem: {
    width: itemWidth,
    aspectRatio: 1,
  },
});

export default styles;