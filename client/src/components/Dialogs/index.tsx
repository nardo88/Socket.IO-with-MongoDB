import { FC } from 'react'
import DialogItem from './DialogItem'

interface DialogItem {
  items: any
  ownerId: string
}

const Dialogs: FC<DialogItem> = ({ items, ownerId }) => {
  return (
    <div>
      {items.map((item: any) => (
        <DialogItem
          key={item._id}
          isMe={item.user._id === ownerId}
          user={item.user}
          text={item.text}
          isReaded={item.isReaded}
          createdAt={item.createdAt}
        />
      ))}
    </div>
  )
}

export default Dialogs
