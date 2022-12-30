import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { List } from '@ui-kitten/components';

import { getIconForQuery, IconsOutlined, QueryInfo, QueryReturnType, QueryType } from '../../utils';
import { EmptyState, Icon, ListItem, View } from '../base';

type Props = {
  queries: QueryInfo[];
  onGoToQuery: (id?: string) => void;
  onDuplicateQuery: (query: QueryInfo) => void;
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
  const paddingBottom = useSafeAreaInsets().bottom;
  return (
    <List
      data={queries}
      contentContainerStyle={
        queries.length === 0 ? styles.flex : { paddingBottom }
      }
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
          icon={getIconForQuery(query.returnInfo.type)}
        />
      )}
    />
  );
};

export default Queries;

const styles = StyleSheet.create({ flex: { flex: 1 } });
