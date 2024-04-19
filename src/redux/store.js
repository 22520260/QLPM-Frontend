import { configureStore } from '@reduxjs/toolkit'
import fetchDataReducer from './slice/getDataSlice/getDataSlice'
import postDataReducer from './slice/postDataSlice/postDataSlice'


export default configureStore({
  reducer: {
    getData: fetchDataReducer,
    postData: postDataReducer,
  },
  devTools: true,
})