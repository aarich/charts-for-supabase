import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp, RootStackParamList } from '../types';

export const useStackNavigation = <
  T extends keyof RootStackParamList = never
>() => useNavigation<RootStackNavigationProp<T>>();
