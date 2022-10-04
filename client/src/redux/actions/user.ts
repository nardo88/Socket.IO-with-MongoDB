import api from '../../hooks/axios'

const actions = {
  setUser: (data: any) => ({
    type: 'SET_USER',
    payload: data,
  }),
  fetchUserData: () => (dispatch: any) => {
    api
      .get('/user/me')
      .then(({ data }) => {
        if (data._id) {
          dispatch(actions.setUser(data))
        }
        console.log('data - ', data)
      })
      .catch((error) => console.log(error))
  },
  confirmUser: (hash: string) => (dispatch: any) => {
    api
      .put(`/user/confirm/${hash}`)
      .then(({ data }) => {
        console.log(data)
        if (data.status === 'error') {
          alert(data.message)
        } else {
          localStorage.setItem('userData', data.token)
          // @ts-ignore
          dispatch(actions.fetchUserData())
        }
      })
      .catch((error) => console.log(error))
  },
}

export default actions
