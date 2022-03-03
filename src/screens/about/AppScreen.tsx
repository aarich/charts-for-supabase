import { useLinkTo } from '@react-navigation/native';
import { useEffect } from 'react';

export default () => {
  const linkTo = useLinkTo();

  useEffect(() => {
    linkTo('/home');
  }, [linkTo]);
  return null;
};
