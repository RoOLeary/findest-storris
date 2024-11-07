import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { storyApi } from './services/storyApi';  // Import your storyApi
import { setupListeners } from '@reduxjs/toolkit/query';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Redux Router Setup
const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

// Persistence Config
const persistConfig = {
  key: 'root',
  storage,
};

// Combining reducers with persistence and RTK Query reducer
const rootReducer = combineReducers({
  router: routerReducer,
  [storyApi.reducerPath]: storyApi.reducer,  // Include RTK Query reducer
});

// Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,  // Apply persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // For persistence compatibility
    }).concat([storyApi.middleware, routerMiddleware]),  // Concatenate RTK Query and router middleware
});

// Set up listeners for RTK Query refetching
setupListeners(store.dispatch);

// Create the persistor for persistence
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create history for React Router
export const history = createReduxHistory(store);
