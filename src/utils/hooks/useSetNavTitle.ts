import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { RootStackScreenProps } from '../types';

export const useNavTitle = (title: string | undefined) => {
  const navigation = useNavigation<RootStackScreenProps<never>['navigation']>();

  useEffect(() => {
    navigation.setOptions({ title });
  }, [title, navigation]);
};
