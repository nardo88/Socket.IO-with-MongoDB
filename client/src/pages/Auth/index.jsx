import Block from '../../components/Block'
import Button from '../../components/Button'
import './Auth.scss'

const Auth = () => {
  return (
    <section className="auth">
      <div className="auth__top">
        <h2>Войти в аккаунт</h2>
        <p>Пожалуйста, войдите в свой аккаунт</p>
      </div>
      <Block className="auth__block">
        <Button>This is button</Button>
      </Block>
    </section>
  )
}

export default Auth
