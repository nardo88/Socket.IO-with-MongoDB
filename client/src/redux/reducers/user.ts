const initialState = {
  data: null,
  isAuth: false,
}

function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, data: action.payload, isAuth: true }

    default:
      return state
  }
}

export default userReducer
