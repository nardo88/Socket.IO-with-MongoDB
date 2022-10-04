import { Result } from 'antd'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import actions from '../../redux/actions/user'

const Confirm = () => {
  const { hash } = useParams()
  const dispatch = useDispatch()
  if (hash) {
    console.log(hash)
    try {
      // @ts-ignore
      dispatch(actions.confirmUser(hash))
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div>
      <Result
        status="success"
        title="Вы успешно зарегистрировались!"
        subTitle="Для подтверждения аккаунта, проверьте свой Email!"
      />
    </div>
  )
}

export default Confirm
