import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from 'redux-persist/es/persistStore';


const persistConfig = {
  key:"root",
  storage,
  version:1,
}

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
})

const persisitedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer : persisitedReducer,
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
});

export const persisitor = persistStore(store);
