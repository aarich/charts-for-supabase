import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import SupabaseConfigModalContainer from '../../containers/connections/SupabaseConfigModalContainer';
import { connectionConfigFnRef } from '../interactions';

type ConfigContextType = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const defaultContext: ConfigContextType = {
  visible: false,
  setVisible: () => null,
};

const ConfigContext = createContext<ConfigContextType>(defaultContext);

const ConnectionSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState<boolean>(defaultContext.visible);
  connectionConfigFnRef.current = () => setVisible(true);

  return (
    <ConfigContext.Provider value={{ visible, setVisible }}>
      <SupabaseConfigModalContainer
        visible={visible}
        onClose={() => setVisible(false)}
      />
      {children}
    </ConfigContext.Provider>
  );
};

export default ConnectionSettingsProvider;
