import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tasksReducer from './reducers/tasksReducer';

// Configure the persist setup
const persistConfig = {
  key: 'root',
  storage,
};

// Wrap the tasksReducer with persistReducer to enable persistence
const persistedReducer = persistReducer(persistConfig, tasksReducer);

export const store = configureStore({
  reducer: {
    tasks: persistedReducer, // Aaaaaand apply the persisted reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for persistence compatibility
    }),
});

// Export the persistor, then BOOM!!! We're away!
export const persistor = persistStore(store);

// TypeScript types for the RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
