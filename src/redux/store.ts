import { combineReducers, configureStore } from '@reduxjs/toolkit'
import layoutReducer from '@/redux/ui/layout'
import { persistReducer, persistStore } from 'redux-persist'
import { createPersistStorage } from '@/redux/storage'

import typeReducer from '@/redux/api/type'
import schemaReducer from '@/redux/api/schema'
import contentReducer from '@/redux/api/content'

const storage = createPersistStorage()

const rootReducer = combineReducers({
  layout: layoutReducer,
  content: contentReducer,
  schema: schemaReducer,
  type: typeReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['layout']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
