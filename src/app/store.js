
import counterSlice from '../features/counter/counterSlice'
import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from '../services/userAuthApi'
import { userChatApi } from '../services/userChatApi'

export const store = configureStore({
  reducer: {
    counter:counterSlice,
    // Add the generated reducer as a specific top-level slice
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [userChatApi.reducerPath]: userChatApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware,userChatApi.middleware),
})

setupListeners(store.dispatch)