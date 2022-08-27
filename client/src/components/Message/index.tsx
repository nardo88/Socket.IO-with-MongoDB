import { FC } from 'react'
import './Message.scss'
import dayjs from 'dayjs'

interface MessageProps {
  user: {
    fullName: string
  }
  avatar: string
  date: string | number
  content: string
  isMe?: boolean
}

const Message: FC<MessageProps> = ({ avatar, content, date, isMe, user }) => {
  return (
    <div className="message">
      <div className="message__avatar">
        <img src={avatar} alt="" />
      </div>
      <div className="message__content">
        <div className="message__buble">
          <p className="message__text">{content}</p>
        </div>
        <span className="message__date">
          {dayjs(date).format('DD.MM.YYYY')}
        </span>
      </div>
    </div>
  )
}

export default Message
