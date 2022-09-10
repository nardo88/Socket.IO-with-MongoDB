const initialState = {
  items: [],
}

function messagesReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'SET_MESSAGES':
      return { ...state, items: action.payload }
    default:
      return state
  }
}

export default messagesReducer
