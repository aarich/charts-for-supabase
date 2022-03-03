import AsyncStorage from '@react-native-async-storage/async-storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  Action,
  AnyAction,
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Store
const persistedReducer = persistReducer(persistConfig, rootReducer);
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  persistedReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);
export const persistor = persistStore(store);

// Types
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, never, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
  Promise<ReturnType>,
  RootState,
  undefined,
  Action<string>
>;

// Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
