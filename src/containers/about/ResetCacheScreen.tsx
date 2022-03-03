import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ResetCache from '../../components/about/ResetCache';
import { reset } from '../../redux/actions';
import {
  alert,
  handleError,
  log,
  MyConstants,
  RootStackScreenProps,
  toast,
} from '../../utils';

type Props = RootStackScreenProps<'ResetCache'>;

const ResetCacheScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const [storage, setStorage] = useState<number>();

  useEffect(() => {
    if (FileSystem.cacheDirectory) {
      FileSystem.getInfoAsync(FileSystem.cacheDirectory)
        .then((info) => setStorage(info.size))
        .catch(log);
    }
  }, []);

  const usage =
    storage != null &&
    `${MyConstants.manifest?.name} is currently using approximately ${(
      storage * 0.000001
    ).toPrecision(2)} MB of dynamic image content.`;

  const onReset = () => {
    dispatch(reset());
    if (!FileSystem.cacheDirectory) {
      toast('Successful', 'success', 0);
      return;
    }

    FileSystem.readDirectoryAsync(FileSystem.cacheDirectory)
      .then((files) =>
        Promise.all(
          files.map((file) =>
            FileSystem.deleteAsync(FileSystem.cacheDirectory + file)
          )
        )
      )
      .then(() =>
        alert(
          'Cache Cleared',
          'Please close and reopen the app.\n\nStill seeing issues? Make sure you have the latest version of the app!'
        )
      )
      .catch(handleError);
    navigation.pop();
  };

  return <ResetCache storageUsage={usage || ''} onReset={onReset} />;
};

export default ResetCacheScreen;
