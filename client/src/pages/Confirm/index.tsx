import { Result } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import actions from '../../redux/actions/user'

const Confirm = () => {
  const [status, setStatus] = useState<'success' | 'error'>('success')
  const { hash } = useParams()
  const dispatch = useDispatch()
  if (hash) {
    try {
      // @ts-ignore
      dispatch(actions.confirmUser(hash))
    } catch (e) {
      setStatus('error')
      console.log(e)
    }
  }
  return (
    <div>
      <Result
        status={status}
        title="Вы успешно зарегистрировались!"
        subTitle="Для подтверждения аккаунта, проверьте свой Email!"
      />
    </div>
  )
}

export default Confirm
