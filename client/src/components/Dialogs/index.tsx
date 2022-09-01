import { FC } from 'react'
import DialogItem from './DialogItem'

interface DialogItemProps {
  items: any
  ownerId: string
}

const Dialogs: FC<DialogItemProps> = ({ items, ownerId }) => {
  return (
    <div>
      {items.map((item: any) => (
        <DialogItem key={item._id} isMe={item.user._id === ownerId} {...item} />
      ))}
    </div>
  )
}

export default Dialogs
