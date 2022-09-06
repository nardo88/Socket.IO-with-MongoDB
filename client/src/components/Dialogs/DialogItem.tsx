import { FC } from 'react'
import NotReadIcon from '../icons/NotRead'
import ReadIcon from '../icons/Read'
import './DialogItem.scss'

import dayjs from 'dayjs'
import Avatar from '../Avatar'
const isToday = require('dayjs/plugin/isToday')
dayjs.extend(isToday)

interface DialogItemProps {
  isMe: boolean
  user: {
    fullName: string
    avatar: null | string
    _id: string
    isOnline: boolean
  }
  text: string
  isReaded: boolean
  createdAt: number
  count: number
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
  count,
}) => {
  return (
    <div className="dialog">
      <div
        className={`dialog__avatar ${
          user.isOnline ? 'dialog__avatar--online' : ''
        }`}>
        <Avatar user={user} size={40} />
      </div>
      <div className="dialog__info info">
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
