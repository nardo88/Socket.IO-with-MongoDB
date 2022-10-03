import Block from '../../components/Block'
import Button from '../../components/Button'
import './Auth.scss'
import { Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { NavLink, useNavigate } from 'react-router-dom'
import api from '../../hooks/axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import actions from '../../redux/actions/user'

const Auth = ({ isAuth }: any) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate('/dialogs')
    }
  }, [isAuth])

  const onFinish = async (values: any) => {
    setIsLoading(true)
    setError('')
    api
      .post('/user/signin', {
        ...values,
      })
      .then(({ data }) => {
        if (!data.token) {
          setError(data)
        }
        localStorage.setItem('userData', data.token)
        // @ts-ignore
        dispatch(actions.fetchUserData())
      })
      .catch((res) => {
        console.log(res)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <section className="auth">
      <div className="auth__top">
        <h2>Войти в аккаунт</h2>
        <p>Пожалуйста, войдите в свой аккаунт</p>
      </div>
      <Block className="auth__block form">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
                type: 'email',
              },
            ]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your Password!' },
            ]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              autoComplete="off"
              placeholder="Password"
            />
          </Form.Item>
          {error && <div className="auth__error">{error}</div>}
          <Form.Item>
            <Button
              type="primary"
              disabled={isLoading}
              htmlType="submit"
              className="login-form-button">
              {isLoading ? 'Отправка...' : 'Войти в аккаунт'}
            </Button>
          </Form.Item>
          <NavLink to="/register">Зарегистрироваться</NavLink>
        </Form>
      </Block>
    </section>
  )
}

export default Auth
