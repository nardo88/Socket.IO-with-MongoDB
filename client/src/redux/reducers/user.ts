import api from '../../hooks/axios'

const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'

const initialState = {
  data: null,
  isAuth: false,
}

function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_USER:
      return { ...state, data: action.payload, isAuth: true }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

export default userReducer

// ACTIONS_CREATORS
export const setUser = (data: any) => ({ type: SET_USER, payload: data })
export const logOut = () => ({ type: LOGOUT })

// THUNKS
// получение данных пользователя
export const fetchUserData = () => {
  return async (dispatch: any) => {
    const { data } = await api.get('/user/me')
    if (data?.message !== 'Auth error') {
      dispatch(setUser(data))
    } else {
      dispatch(logOut())
    }
  }
}

// подтверждение пользователя
export const confirmUser = (hash: string) => {
  return async (dispatch: any) => {
    const { data } = await api.put(`/user/confirm/${hash}`)
    if (data.status === 'error') {
      alert(data.message)
    } else {
      localStorage.setItem('userData', data.token)
      // @ts-ignore
      dispatch(fetchUserData())
    }
  }
}
