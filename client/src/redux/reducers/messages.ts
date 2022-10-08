const SET_MESSAGES = 'SET_MESSAGES'

const initialState = {
  items: [],
}

function messagesReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_MESSAGES:
      return { ...state, items: action.payload }
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
