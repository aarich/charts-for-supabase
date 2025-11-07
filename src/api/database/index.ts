/* eslint-disable filenames/match-exported */
import { ConnectionInfo } from '../../utils';
import { SupabaseConnection } from './SupabaseConnection';

const connection: {
  current?: SupabaseConnection;
  init: (config: ConnectionInfo, password: string) => ReturnType<Body['json']>;
  get: () => SupabaseConnection | undefined;
} = {
  async init(config, password) {
    connection.current?.destroy();
    connection.current = new SupabaseConnection(config.url, config.key);
    try {
      if (config.email) {
        await connection.current.signIn(config.email, password);
      }
    } catch (e) {
      connection.current.destroy();
      connection.current = undefined;
      throw e;
    }
  },
  get: () => connection.current,
};

export default connection;
