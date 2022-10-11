import { useCallback, useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Button, Empty } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import Message from '../Message'
import './Content.scss'
import { addNewMessage, getMeggages } from '../../redux/reducers/messages'
import { IMessage } from '../../types/Message'
import socket from '../../utils/socket'
import { ICurrentDialog } from '../../types/Dialog'
import api from '../../hooks/axios'
import { fetchDialogs } from '../../redux/reducers/dialogs'

const Content = ({ ownId }: any) => {
  const ref = useRef<HTMLDivElement>(null)
  const [messageText, setMessageText] = useState<string>('')
  const messages: IMessage[] = useSelector((state: any) => state.messages.items)
  const currentDialog: ICurrentDialog = useSelector(
    (state: any) => state.dialogs.currentDialog
  )
  const dispatch = useDispatch()

  const sendMessage = () => {
    api
      .post('/messages', {
        text: messageText,
        dialogId: currentDialog.dialogId,
      })
      .then(() => setMessageText(''))
      .catch((error) => console.log(error))
  }

  const newMessage = useCallback(
    (data: any) => {
      dispatch(addNewMessage(data))
      // @ts-ignore
      dispatch(fetchDialogs())
    },
    [dispatch]
  )

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

  useEffect(() => {
    if(ref.current){
      ref.current.scrollTo({top: ref.current.offsetHeight + 9999})
    }
  }, [messages.length])

  return (
    <div className="main__content content">
      <div className="content__header">
        <h3 className="content__title">
          {currentDialog ? currentDialog.user.name : 'Даилог не выбран'}
        </h3>
      </div>
      {/* Вот тут сделать скролл если message.length меняется scrollTo */}
      <div className="content__wrapper" ref={ref}>
        {messages.length > 0 ? (
          messages.map((item: IMessage) => (
            <Message key={item._id} {...item} isMe={ownId === item.author.id} />
          ))
        ) : (
          <div className="content__empty">
            <Empty description="В этом диалоге пока нет сообщений" />
          </div>
        )}
      </div>
      <div className="content__input">
        <Input
          placeholder="Введите сообщение"
          value={messageText}
          onChange={(e: any) => {
            setMessageText(e.target.value)
          }}
          onKeyDown={(e: any) => {
            if (e.key === 'Enter') {
              sendMessage()
            }
          }}
        />
        <Button
          type="primary"
          shape="circle"
          icon={<SendOutlined />}
          onClick={sendMessage}
        />
      </div>
    </div>
  )
}

export default Content
