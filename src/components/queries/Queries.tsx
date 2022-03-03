import { List } from '@ui-kitten/components';
import { Pressable } from 'react-native';
import {
  IconsOutlined,
  IconType,
  QueryInfo,
  QueryReturnType,
  QueryType,
} from '../../utils';
import { EmptyState, Icon, ListItem, View } from '../base';

type Props = {
  queries: QueryInfo[];
  onGoToQuery: (id?: string) => void;
  onDuplicateQuery: (query: QueryInfo) => void;
};

const getIcon = (query: QueryInfo): IconType => {
  if (query.returnInfo.type === QueryReturnType.COUNT) {
    return IconsOutlined.hash;
  }
  switch (query.type) {
    case QueryType.RPC:
      return IconsOutlined.cube;
    case QueryType.SELECT:
      return IconsOutlined.grid;
  }
};

const getLabel = (query: QueryInfo): string => {
  switch (query.type) {
    case QueryType.RPC:
      return `Remote Procedure Call (${query.rpc})`;
    case QueryType.SELECT: {
      const { table, select } = query;
      if (query.returnInfo.type === QueryReturnType.COUNT) {
        return `Select count from ${table}`;
      }
      return `Select ${select} from ${table}`;
    }
  }
};

const Queries = ({ queries, onGoToQuery, onDuplicateQuery }: Props) => {
  return (
    <List
      data={queries}
      ListEmptyComponent={
        <EmptyState
          title="No Queries"
          actions={[
            {
              label: 'Add Query',
              onPress: () => onGoToQuery(),
              icon: IconsOutlined.plus,
            },
          ]}
        />
      }
      renderItem={({ item: query }) => (
        <ListItem
          title={query.name}
          onPress={() => onGoToQuery(query.id)}
          description={getLabel(query)}
          accessoryRight={(props) => (
            <View row>
              <Pressable onPress={() => onDuplicateQuery(query)}>
                <Icon name={IconsOutlined.copy} {...props} />
              </Pressable>
              <Icon name={IconsOutlined.chevronRight} {...props} />
            </View>
          )}
          icon={getIcon(query)}
        />
      )}
    />
  );
};

export default Queries;
