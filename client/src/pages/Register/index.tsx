import Block from '../../components/Block'
import Button from '../../components/Button'
import './Auth.scss'
import { Form, Input } from 'antd'
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

const Register = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
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
              Войти в аккаунт
            </Button>
          </Form.Item>
          <NavLink to="/">Войти в аккаунт</NavLink>
        </Form>
      </Block>
    </section>
  )
}

export default Register
