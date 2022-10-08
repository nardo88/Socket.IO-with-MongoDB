import api from '../../hooks/axios'

const SET_DIALOGS = 'SET_DIALOGS'
const SET_CURRENT_DIALOG = 'SET_CURRENT_DIALOG'

const initialState = {
  items: [],
  currentDialog: null,
}

function dialogsReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_DIALOGS:
      return { ...state, items: action.payload }
    case SET_CURRENT_DIALOG:
      return { ...state, currentDialog: action.payload }
    default:
      return state
  }
}

export default dialogsReducer

// ACTION_CREATOR
export const setItems = (data: any) => ({
  type: SET_DIALOGS,
  payload: data,
})

export const setCurrentDialog = (data: string) => ({
  type: SET_CURRENT_DIALOG,
  payload: data,
})

// THUNKS
export const fetchDialogs = () => async (dispatch: any) => {
  const { data } = await api.get('/dialog')
  dispatch(setItems(data))
}
