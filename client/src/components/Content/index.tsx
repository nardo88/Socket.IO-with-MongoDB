import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Button } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import Message from '../Message'

import './Content.scss'
import { getMeggages } from '../../redux/reducers/messages'
import { IMessage } from '../../types/Message'
import socket from '../../utils/socket'

const Content = ({ ownId }: any) => {
  const messages: IMessage[] = useSelector((state: any) => state.messages.items)
  const currentDialog = useSelector((state: any) => state.dialogs.currentDialog)
  const dispatch = useDispatch()
  console.log('messages = ', messages)
  useEffect(() => {
    if (currentDialog) {
      // @ts-ignore
      dispatch(getMeggages(currentDialog))
    }

    socket.on('NEW_MESSAGE', () => {
      // @ts-ignore
      dispatch(getMeggages(currentDialog))
    })
  }, [currentDialog, dispatch])

  return (
    <div className="main__content content">
      <div className="content__header">
        <h3 className="content__title">Иван пупкин</h3>
      </div>
      <div className="content__wrapper">
        {messages.map((item: IMessage) => (
          <Message key={item.id} {...item} isMe={ownId === item.author.id} />
        ))}
      </div>
      <div className="content__input">
        <Input placeholder="Введите сообщение" />
        <Button type="primary" shape="circle" icon={<SendOutlined />} />
      </div>
    </div>
  )
}

export default Content
