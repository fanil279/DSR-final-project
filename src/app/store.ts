import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'

import { tasksApi } from '../features/tasks/tasksApi'
import { authApi } from '../features/auth/authApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,

    [tasksApi.reducerPath]: tasksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tasksApi.middleware)
      .concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
