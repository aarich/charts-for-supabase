import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboardSize = () => {
  const [keyboardSize, setKeyboardSize] = useState(0);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardSize(e.endCoordinates.height);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardSize(0);
    });

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  return keyboardSize;
};
