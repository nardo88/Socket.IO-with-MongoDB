import Block from '../../components/Block'
import Button from '../../components/Button'
import './Auth.scss'
import { Form, Input } from 'antd'
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'
import { NavLink, useNavigate } from 'react-router-dom'
import api from '../../hooks/axios'

const Register = () => {
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    if (values.pass === values.repetpass) {
      api
        .post('/user/signup', {
          email: values.email,
          fullName: values.name,
          password: values.pass,
        })
        .then(({ data }) => {
          if (data.status === 'error') {
            alert(data.message)
          } else {
            navigate('/register/confim')
          }
        })
        .catch((data) => {
          console.log(data)
        })
    } else {
      alert('Не верно ввели пароль')
    }
  }

  return (
    <section className="auth">
      <div className="auth__top">
        <h2>Регистрация</h2>
        <p>Пожалуйста, заполните поля для регистрации.</p>
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
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="name"
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name="pass"
            rules={[
              { required: true, message: 'Please input your Password!' },
            ]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              autoComplete="off"
              placeholder="Пароль"
            />
          </Form.Item>
          <Form.Item
            name="repetpass"
            rules={[
              { required: true, message: 'Please input your Password!' },
            ]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              autoComplete="off"
              placeholder="Повторите пароль"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button">
              Зарегистрироваться
            </Button>
          </Form.Item>
          <NavLink to="/">Войти в аккаунт</NavLink>
        </Form>
      </Block>
    </section>
  )
}

export default Register
