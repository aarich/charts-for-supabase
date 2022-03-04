import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import SupabaseConfigModalContainer from '../../containers/connections/SupabaseConfigModalContainer';
import { useSetting } from '../../redux/selectors';
import { connectionConfigFnRef } from '../interactions';
import { AppSetting, ConnectionDraft } from '../types';

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
  const storedConfig = useSetting(AppSetting.SUPABASE_CONFIG);

  const [draft, setDraft] = useState<ConnectionDraft>({
    url: storedConfig?.url ?? '',
    key: storedConfig?.key ?? '',
    email: storedConfig?.email ?? '',
    password: '',
  });

  connectionConfigFnRef.current = ({ key, url, email } = {}) => {
    setDraft((d) => ({
      key: key ?? d.key,
      url: url ?? d.url,
      email: email ?? d.email,
      password: d.password,
    }));
    setVisible(true);
  };

  return (
    <ConfigContext.Provider value={{ visible, setVisible }}>
      <SupabaseConfigModalContainer
        visible={visible}
        onClose={() => setVisible(false)}
        draft={draft}
        setDraft={setDraft}
      />
      {children}
    </ConfigContext.Provider>
  );
};

export default ConnectionSettingsProvider;
