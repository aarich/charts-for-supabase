import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, RootStackScreenProps } from '../types';

export const useStackNavigation = <
  T extends keyof RootStackParamList = never
>() => useNavigation<RootStackScreenProps<T>['navigation']>();
