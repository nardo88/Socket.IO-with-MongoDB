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
        dispatch(actions.setUser(data))
      })
      .catch((error) => console.log(error))
  },
}

export default actions
