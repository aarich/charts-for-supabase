import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Spacings } from '../../utils';
import GridListItem, { Props as GridListItemProps } from './GridListItem';
import View from './View';

const DEFAULT_ITEM_SPACINGS = Spacings.s4;
interface GridViewProps {
  items: GridListItemProps[];
  viewWidth: number;
  numColumns: number;
  itemSpacing?: number;
}

const GridView: FC<GridViewProps> = ({
  items,
  viewWidth,
  numColumns,
  itemSpacing = DEFAULT_ITEM_SPACINGS,
}) => {
  const itemSize = (viewWidth - itemSpacing * (numColumns - 1)) / numColumns;

  const renderItem = (item: GridListItemProps, index: number) => {
    const itemsCount = items?.length;
    const rowCount = Math.ceil(itemsCount / numColumns);
    const isLastItemInRow = (index + 1) % numColumns === 0;
    const isLastRow = index + 1 > (rowCount - 1) * numColumns;
    const size = { width: itemSize, height: item.itemSize?.height || itemSize };
    return (
      <GridListItem
        key={index}
        {...item}
        itemSize={size}
        containerStyle={[
          !isLastItemInRow && { marginRight: itemSpacing },
          !isLastRow && { marginBottom: itemSpacing },
          item.containerStyle,
        ]}
      ></GridListItem>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { width: viewWidth ? Math.floor(viewWidth) : undefined },
      ]}
    >
      {itemSize && items.map(renderItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
});

export default GridView;
