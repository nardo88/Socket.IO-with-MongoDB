import api from '../../hooks/axios'

const actions = {
  setItems: (data: any) => ({
    type: 'SET_DIALOGS',
    payload: data,
  }),
  fetchDialogs: () => (dispatch: any) => {
    api.get('/dialog').then(({ data }) => {
      dispatch(actions.setItems(data))
    })
  },
  setCurrentDialog: (data: string) => ({
    type: 'SET_CURRENT_DIALOG',
    payload: data,
  }),
}

export default actions
