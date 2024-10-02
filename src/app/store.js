


import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage
import { combineReducers } from 'redux';

import loginSlice from '../features/Login/LoginSlice';
import quizSlice from '../features/Quiz/QuizSlice';
import homeSlice from '../features/home/HomeSlice';

import { userAuthApi } from '../services/userAuthApi'
import { userChatApi } from '../services/userChatApi'
import { userLoginApi } from '../services/userLoginApi'
import { hadithApi } from '../services/hadithApi'
import { postApi } from '../services/postApi'
import { postSlice } from '../features/Post/PostSlice'
import { friendsApi } from '../services/friendsApi'
import { profileApi } from '../services/profileApi'
import { groupsApi } from '../services/groupsApi'
import { pagesApi } from '../services/pagesApi'
import { quizApi } from '../services/quizApi'
import { iaccountsApi } from '../services/iaccountsApi';
import { loveApi } from '../services/loveApi';
import { unlikeApi } from '../services/unlikeApi';
import { chatsApi } from '../services/chatsApi';
import { commentApi } from '../services/commentApi';

// Redux-persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['quiz'], // Specify which reducers you want to persist (e.g., 'quiz')
};

// Combine all your reducers
const rootReducer = combineReducers({
  login: loginSlice,
  quiz: quizSlice,
  home: homeSlice,
  post: postSlice,
  [userAuthApi.reducerPath]: userAuthApi.reducer,
  [userChatApi.reducerPath]: userChatApi.reducer,
  [userLoginApi.reducerPath]: userLoginApi.reducer,
  [hadithApi.reducerPath]: hadithApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [friendsApi.reducerPath]: friendsApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [groupsApi.reducerPath]: groupsApi.reducer,
  [pagesApi.reducerPath]: pagesApi.reducer,
  [quizApi.reducerPath]: quizApi.reducer,
  [iaccountsApi.reducerPath]: iaccountsApi.reducer,
  [loveApi.reducerPath]: loveApi.reducer,
  [unlikeApi.reducerPath]: unlikeApi.reducer,
  [chatsApi.reducerPath]: chatsApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  
});

// Persist the reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      userAuthApi.middleware,
      userChatApi.middleware,
      pagesApi.middleware,
      userLoginApi.middleware,
      hadithApi.middleware,
      postApi.middleware,
      friendsApi.middleware,
      profileApi.middleware,
      quizApi.middleware,
      groupsApi.middleware,
      iaccountsApi.middleware,
      loveApi.middleware,
      unlikeApi.middleware,
      chatsApi.middleware,
      commentApi.middleware,
    ),
});

export const persistor = persistStore(store);

// Optional: Enable listeners
setupListeners(store.dispatch);
