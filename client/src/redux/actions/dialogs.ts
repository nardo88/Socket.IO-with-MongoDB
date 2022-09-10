const actions = {
  setItems: (data: any) => ({
    type: 'SET_DIALOGS',
    payload: data,
  }),
  fetchDialogs: () => (dispatch: any) => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((data) => data.json())
      .then((data) => dispatch(actions.setItems(data)))
  },
}

export default actions
