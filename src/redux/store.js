import { configureStore } from '@reduxjs/toolkit'
import fetchDataReducer from './slice/fetchData/DSDK_fetchUser'


export default configureStore({
  reducer: {
    data: fetchDataReducer,
  },
  devTools: true,
})