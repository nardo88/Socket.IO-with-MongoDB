import { FC } from 'react'
import './Message.scss'
import dayjs from 'dayjs'
import ReadIcon from '../icons/Read'
import NotReadIcon from '../icons/NotRead'

interface FileType {
  filename: string
  url: string
}

interface MessageProps {
  user: {
    fullName: string
  }
  avatar: string
  date: string | number
  content: string
  isMe?: boolean
  isRead?: boolean
  attachments?: FileType[]
}

const Message: FC<MessageProps> = ({
  avatar,
  content,
  date,
  isMe,
  user,
  isRead,
  attachments,
}) => {
  return (
    <div className={`message ${isMe ? 'message--isme' : ''}`}>
      <div className="message__avatar">
        <img src={avatar} alt="" />
      </div>
      <div className="message__content">
        <div
          className={isMe ? 'message__buble--isme' : 'message__buble--notme'}>
          <p className="message__text">{content}</p>
        </div>
        {attachments && (
          <div className="message__images">
            {attachments.map((item: FileType) => (
              <div className="message__image" key={item.url}>
                <img src={item.url} alt={item.filename} />
              </div>
            ))}
          </div>
        )}
        <div className="df aic mt4">
          {isMe && <span> {isRead ? <ReadIcon /> : <NotReadIcon />}</span>}
          <span className={`message__date ${isMe && 'ml8'}`}>
            {dayjs(date).format('DD.MM.YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Message
