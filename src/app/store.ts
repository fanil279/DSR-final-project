import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/authSlice'

import { tasksApi } from '../features/tasksApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,

    [tasksApi.reducerPath]:
      tasksApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      tasksApi.middleware
    ),
})

export type RootState = ReturnType<
  typeof store.getState
>

export type AppDispatch =
  typeof store.dispatch
  