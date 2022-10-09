import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Button, Empty } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import Message from '../Message'
import './Content.scss'
import { getMeggages } from '../../redux/reducers/messages'
import { IMessage } from '../../types/Message'
import socket from '../../utils/socket'
import { ICurrentDialog } from '../../types/Dialog'

const Content = ({ ownId }: any) => {
  const messages: IMessage[] = useSelector((state: any) => state.messages.items)
  const currentDialog: ICurrentDialog = useSelector(
    (state: any) => state.dialogs.currentDialog
  )
  const dispatch = useDispatch()

  const newMessage = useCallback(() => {
    console.log(currentDialog.dialogId);
    // @ts-ignore
    dispatch(getMeggages(currentDialog.dialogId))
  }, [currentDialog, dispatch])

  useEffect(() => {
    if (currentDialog) {
      // @ts-ignore
      dispatch(getMeggages(currentDialog.dialogId))
      socket.on('NEW_MESSAGE', newMessage)
    }

    return () => {
      socket.removeListener('NEW_MESSAGE', newMessage)
    }
  }, [currentDialog, dispatch, newMessage])

  return (
    <div className="main__content content">
      <div className="content__header">
        <h3 className="content__title">
          {currentDialog ? currentDialog.user.name : 'Даилог не выбран'}
        </h3>
      </div>
      {/* Вот тут сделать скролл если message.length меняется scrollTo */}
      <div className="content__wrapper">
        {messages.length > 0 ? (
          messages.map((item: IMessage) => (
            <Message key={item.id} {...item} isMe={ownId === item.author.id} />
          ))
        ) : (
          <div className="content__empty">
            <Empty description="В этом диалоге пока нет сообщений" />
          </div>
        )}
      </div>
      <div className="content__input">
        <Input placeholder="Введите сообщение" />
        <Button type="primary" shape="circle" icon={<SendOutlined />} />
      </div>
    </div>
  )
}

export default Content
