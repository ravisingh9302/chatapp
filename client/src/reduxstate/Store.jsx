import { configureStore } from '@reduxjs/toolkit'
import rootReducers from './Reducers'
export default configureStore({
  reducer:rootReducers
})