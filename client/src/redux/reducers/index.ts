import { combineReducers } from 'redux'
import dialogsReducer from './dialogs'
import messagesReducer from './messages'

export default combineReducers({
  dialogs: dialogsReducer,
  messages: messagesReducer,
})
