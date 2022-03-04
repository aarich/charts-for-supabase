import { List } from '@ui-kitten/components';
import { Pressable, StyleSheet } from 'react-native';
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
      contentContainerStyle={queries.length === 0 ? styles.flex : undefined}
      ListEmptyComponent={
        <EmptyState
          title="Nothing Here Yet"
          description="Create queries to load data"
          actions={[
            {
              label: 'Add a Query',
              onPress: () => onGoToQuery(),
              icon: IconsOutlined.plusCircle,
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

const styles = StyleSheet.create({ flex: { flex: 1 } });