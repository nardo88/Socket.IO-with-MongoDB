import api from '../../hooks/axios'
import { IMessage } from '../../types/Message'

interface IAction {
  payload: IMessage | IMessage[]
  type: string
}

interface Istate {
  items: any
}

const SET_MESSAGES = 'SET_MESSAGES'
const ADD_MESSAGE = 'ADD_MESSAGE'

const initialState: Istate = {
  items: [],
}



function messagesReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case SET_MESSAGES:
      return { ...state, items: action.payload }
    case ADD_MESSAGE:
      return {items: [...state.items, action.payload]}
    default:
      return state
  }
}

export default messagesReducer

//  ACTION_CREATOR
export const setMessages = (data: any) => ({
  type: SET_MESSAGES,
  payload: data,
})

export const addNewMessage = (data: IMessage) => ({
  type: ADD_MESSAGE,
  payload: data,
})

// THUNK
export const getMeggages = (dialogId: string) => {
  return async (dispatch: any) => {
    const { data } = await api.get(`/messages/${dialogId}`)
    dispatch(setMessages(data))
  }
}
