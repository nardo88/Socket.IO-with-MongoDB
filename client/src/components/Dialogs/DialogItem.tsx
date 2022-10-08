import { FC } from 'react'
import NotReadIcon from '../icons/NotRead'
import ReadIcon from '../icons/Read'
import './DialogItem.scss'

import dayjs from 'dayjs'
import Avatar from '../Avatar'
import { useDispatch } from 'react-redux'
import { setCurrentDialog } from '../../redux/reducers/dialogs'
import { IDialogItem, IMember } from '../../types/Dialog'
const isToday = require('dayjs/plugin/isToday')
dayjs.extend(isToday)

interface DialogItemProps extends IDialogItem {
  isMe: boolean
  currentUserId: string
}

const getUser = (
  currentUserId: string,
  partner: IMember,
  author: IMember
): IMember => {
  if (partner.id === currentUserId) {
    return author
  } else {
    return partner
  }
}

const getDate = (createdAt: Date) =>
  // @ts-ignore
  dayjs(createdAt).isToday()
    ? dayjs(createdAt).format('HH:mm')
    : dayjs(createdAt).format('DD.mm.YYYY')

const DialogItem: FC<DialogItemProps> = ({
  isMe,
  author,
  lastMessage,
  partner,
  id,
  currentUserId,
  updatedAt,
}) => {
  const user = getUser(currentUserId, partner, author)
  const dispatch = useDispatch()
  return (
    <div className="dialog" onClick={() => dispatch(setCurrentDialog(id))}>
      <div
        className={`dialog__avatar ${
          user?.isOnline ? 'dialog__avatar--online' : ''
        }`}>
        <Avatar user={user} size={40} />
      </div>
      <div className="dialog__info info">
        <div className="info__top">
          <b>{user.name}</b>
          <div className="info__date">{getDate(updatedAt)}</div>
        </div>
        <div className="info__bottom">
          <p className="info__message">{lastMessage.message}</p>
          {
            isMe && (
              <span>
                {' '}
                {lastMessage.readed ? <ReadIcon /> : <NotReadIcon />}
              </span>
            )
            // : (
            //   <span className="info__message--count">{count}</span>
            // )
          }
        </div>
      </div>
    </div>
  )
}

export default DialogItem
