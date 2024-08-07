

import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from '../services/userAuthApi'
import { userChatApi } from '../services/userChatApi'
import { userLoginApi } from '../services/userLoginApi'

import  loginSlice  from '../features/Login/LoginSlice'
import quizSlice  from '../features/Quiz/QuizSlice'
import  homeSlice from '../features/home/HomeSlice'

export const store = configureStore({
  reducer: {
    
   login:loginSlice,
   quiz:quizSlice,
   home:homeSlice,
    // Add the generated reducer as a specific top-level slice
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [userChatApi.reducerPath]: userChatApi.reducer,
    [userLoginApi.reducerPath]: userLoginApi.reducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware,userChatApi.middleware,userLoginApi.middleware),
})

setupListeners(store.dispatch)