import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashBoardSlice from '../slice/dashBoard/dashSlice';
import CartSlice from '../slice/cartSlice/cartSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['DashBoardSlice', 'CartSlice'],
};

const reducers = combineReducers({
  CartSlice,
  DashBoardSlice
});

const persistedReducer = persistReducer(persistConfig, reducers);

// Store configuration
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
