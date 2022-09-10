const initialState = {
  items: [],
  currentDialod: null,
}

function dialogsReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'SET_DIALOGS':
      return { ...state, items: action.payload }
    case 'SET_CURRENT_DIALOG':
      return { ...state, currentDialod: action.payload }
    default:
      return state
  }
}

export default dialogsReducer
