import { FC } from 'react'
import DialogItem from './DialogItem'
import { Input } from 'antd'
import GroupIcon from '../icons/GroupIcon'
import WriteIcon from '../icons/WriteIcon'
import { IDialogItem } from '../../types/Dialog'
const { Search } = Input

interface DialogItemProps {
  items: IDialogItem[]
  ownerId: string
}

const DialogList: FC<DialogItemProps> = ({ items, ownerId }) => {
  console.log(items)
  return (
    <div className="main__dialogs dialogs">
      <div className="dialogs__header">
        <div className="dialogs__title">
          <div className="dialogs__title--icon">
            <GroupIcon />
          </div>
          <span>Список диалогов</span>
        </div>
        <div className="dialogs__img">
          <WriteIcon />
        </div>
      </div>
      <div className="dialogs__search">
        <Search
          placeholder="Поиск среди контактов"
          onSearch={(value: any) => console.log(value)}
        />
      </div>
      <div className="dialogs__list">
        {items.map((item: IDialogItem) => (
          <DialogItem
            key={item.id}
            isMe={item.lastMessage.userId === ownerId}
            currentUserId={ownerId}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}

export default DialogList
