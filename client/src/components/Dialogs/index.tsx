import { FC } from 'react'
import DialogItem from './DialogItem'

interface DialogItemProps {
  items: any
  ownerId: string
}

const Dialogs: FC<DialogItemProps> = ({ items, ownerId }) => {
  console.log(items)
  return (
    <div>
      {items.map((item: any) => (
        <DialogItem
          key={item._id}
          isMe={item.lastMessage.userId === ownerId}
          {...item}
        />
      ))}
    </div>
  )
}

export default Dialogs
