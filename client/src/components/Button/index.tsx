import { Button as BaseButton } from 'antd'
import './Button.scss'

const Button = ({ children, ...props }: any) => {
  return <BaseButton {...props} type="primary" block>{children}</BaseButton>
}

export default Button
