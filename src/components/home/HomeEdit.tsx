import { ScrollView } from 'react-native-gesture-handler';
import { DashboardRow, IconsOutlined } from '../../utils';
import { Button, Layout } from '../base';
import RowEdit from './RowEdit';

type Props = {
  rows: DashboardRow[];
  onSetRow: (row: DashboardRow, index?: number) => void;
  onMoveUp: (index: number) => void;
  onRemove: (index: number) => void;
};

const HomeEdit = ({ rows, onSetRow, onRemove, onMoveUp }: Props) => {
  return (
    <Layout flex>
      <ScrollView>
        {rows.map((row, index) => {
          const moveUp = index === 0 ? undefined : () => onMoveUp(index);
          const moveDown =
            index === rows.length - 1 ? undefined : () => onMoveUp(index + 1);
          return (
            <RowEdit
              key={index}
              row={row}
              rowIndex={index}
              onUpdate={(row) => onSetRow(row, index)}
              onRemove={() => onRemove(index)}
              onCopy={() => onSetRow(row)}
              onMoveUp={moveUp}
              onMoveDown={moveDown}
            />
          );
        })}
        <Button
          label="New Row"
          onPress={() => onSetRow({ charts: [], height: 2 })}
          ghost
          icon={{ name: IconsOutlined.plusCircle }}
        />
      </ScrollView>
    </Layout>
  );
};

export default HomeEdit;
