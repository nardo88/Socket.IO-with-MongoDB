import { combineReducers } from 'redux'
import dialogsReducer from './dialogs'
import messagesReducer from './messages'
import userReducer from './user'

export default combineReducers({
  dialogs: dialogsReducer,
  messages: messagesReducer,
  user: userReducer,
})
