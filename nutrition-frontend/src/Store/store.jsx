import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
 
const persistConfig = {
  key: 'root',
  storage,
}

 
const persistedReducer = persistReducer(persistConfig, appReducer)
 

export const store = configureStore({
  reducer: {
    appData: persistedReducer,
  },
})


export const persistor = persistStore(store)