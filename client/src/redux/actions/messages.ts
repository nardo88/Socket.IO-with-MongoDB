const actions = {
  setMessages: (data: any) => ({
    type: 'SET_MESSAGES',
    payload: data,
  }),
  fetchMessages: (dialogId: string) => (dispatch: any) => {
    console.log(dialogId)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((data) => data.json())
      .then((data) => dispatch(actions.setMessages(data)))
  },
}

export default actions
