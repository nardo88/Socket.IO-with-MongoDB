import { combineReducers } from 'redux'
import dialogsReducer from './dialogs'

export default combineReducers({
  dialogs: dialogsReducer,
})
