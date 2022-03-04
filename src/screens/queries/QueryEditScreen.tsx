import { useEffect } from 'react';
import { HeaderButton } from '../../components/base';
import EditQueryContainer from '../../containers/queries/EditQueryContainer';
import { deleteQuery } from '../../redux/actions';
import { useQuery } from '../../redux/selectors';
import { useAppDispatch } from '../../redux/store';
import { IconsOutlined, RootStackScreenProps, toast } from '../../utils';

type Props = RootStackScreenProps<'QueryEdit'>;

const QueryEditScreen = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const queryToEdit = useQuery(id || '');
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerRight: queryToEdit
        ? () => (
            <HeaderButton
              icon={IconsOutlined.trash}
              onPress={() => {
                dispatch(deleteQuery(queryToEdit));
                navigation.pop();
              }}
            />
          )
        : undefined,
    });
  }, [dispatch, navigation, queryToEdit]);

  return (
    <EditQueryContainer
      queryToEdit={queryToEdit}
      onCancel={() => navigation.pop()}
      onSaved={() => {
        navigation.pop();
        toast('Saved');
      }}
    />
  );
};

export default QueryEditScreen;
