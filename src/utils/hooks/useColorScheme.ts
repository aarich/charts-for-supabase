import {
  ColorSchemeName,
  useColorScheme as _useColorScheme,
} from 'react-native';

export const useColorScheme = (): NonNullable<ColorSchemeName> => {
  return _useColorScheme() as NonNullable<ColorSchemeName>;
};

export const useIsDark = () => useColorScheme() === 'dark';
