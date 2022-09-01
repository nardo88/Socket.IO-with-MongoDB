import { FC } from 'react'
import NotReadIcon from '../icons/NotRead'
import ReadIcon from '../icons/Read'
import './DialogItem.scss'

import dayjs from 'dayjs'
const isToday = require('dayjs/plugin/isToday')
dayjs.extend(isToday)

const online = true
const count = 5

interface DialogItemProps {
  isMe: boolean
  user: {
    fullName: string
    avatar: null | string
  }
  text: string
  isReaded: boolean
  createdAt: number
}

const getDate = (createdAt: number) =>
  // @ts-ignore
  dayjs(createdAt).isToday()
    ? dayjs(createdAt).format('HH:mm')
    : dayjs(createdAt).format('DD.mm.YYYY')

const DialogItem: FC<DialogItemProps> = ({
  isMe,
  user,
  text,
  isReaded,
  createdAt,
}) => {
  return (
    <div className="dialog__item">
      <div
        className={`dialog__item--avatar ${
          online ? 'dialog__item--avatar-online' : ''
        }`}>
        {user.avatar ? (
          <img src={user.avatar} alt="" />
        ) : (
          <div className="dialog__item--empty-avatar"></div>
        )}
      </div>
      <div className="dialog__item--info info">
        <div className="info__top">
          <b>{user.fullName}</b>
          <div className="info__date">{getDate(createdAt)}</div>
        </div>
        <div className="info__bottom">
          <p className="info__message">{text}</p>
          {isMe ? (
            <span> {isReaded ? <ReadIcon /> : <NotReadIcon />}</span>
          ) : (
            <span className="info__message--count">{count}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default DialogItem
