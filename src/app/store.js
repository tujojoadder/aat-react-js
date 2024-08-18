

import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'

import  loginSlice  from '../features/Login/LoginSlice'
import quizSlice  from '../features/Quiz/QuizSlice'
import  homeSlice from '../features/home/HomeSlice'
import { userAuthApi } from '../services/userAuthApi'
import { userChatApi } from '../services/userChatApi'
import { userLoginApi } from '../services/userLoginApi'
import { hadithApi } from '../services/hadithApi'
import { postApi } from '../services/postApi'
import { postSlice } from '../features/Post/PostSlice'
import { friendsApi } from '../services/friendsApi'
import { profileApi } from '../services/profileApi'

export const store = configureStore({
  reducer: {
    
   login:loginSlice,
   quiz:quizSlice,
   home:homeSlice,
   post:postSlice,
    // Add the generated reducer as a specific top-level slice
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [userChatApi.reducerPath]: userChatApi.reducer,
    [userLoginApi.reducerPath]: userLoginApi.reducer,
    [hadithApi.reducerPath]: hadithApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware,userChatApi.middleware,userLoginApi.middleware,hadithApi.middleware,postApi.middleware,friendsApi.middleware,profileApi.middleware),
})

setupListeners(store.dispatch)