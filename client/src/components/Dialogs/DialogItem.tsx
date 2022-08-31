import NotReadIcon from '../icons/NotRead'
import ReadIcon from '../icons/Read'
import './DialogItem.scss'

const avatar =
  'https://sun1-30.userapi.com/s/v1/ig2/IQg8pIe0OhB375-ioMb5ufiE1kbyM1btJik63fR4rKcXKAMSW9AvJdwE9uUY0cNq75YYxBuZY3199thmDQrWYnKI.jpg?size=100x100&quality=96&crop=86,86,689,689&ava=1'

const online = true
const isMe = true
const isRead = false
const count = 5

const DialogItem = () => {
  return (
    <div className="dialog__item">
      <div
        className={`dialog__item--avatar ${
          online ? 'dialog__item--avatar-online' : ''
        }`}>
        <img src={avatar} alt="" />
      </div>
      <div className="dialog__item--info info">
        <div className="info__top">
          <b>{'Александр Пушкин'}</b>
          <div className="info__date">13:30</div>
        </div>
        <div className="info__bottom">
          <p className="info__message">
            Далеко-далеко за словесными горами в стране гласных и согласных
            живут рыбные тексты. Маленький живет то послушавшись дорогу?
          </p>
          {isMe ? (
            <span> {isRead ? <ReadIcon /> : <NotReadIcon />}</span>
          ) : (
            <span className="info__message--count">{count}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default DialogItem
