import './Dialogs.scss'

import { Input } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useSelector } from 'react-redux'
import Message from '../../components/Message'
import DialogList from '../../components/Dialogs/DialogsList'
import { useEffect } from 'react'
import { fetchDialogs } from '../../redux/reducers/dialogs'
import { useDispatch } from 'react-redux'
import { IDialogItem } from '../../types/Dialog'

const DialogsPage = () => {
  const dispatch = useDispatch()
  const ownId = useSelector((state: any) => state.user.data._id)
  const dialogs:IDialogItem[] = useSelector((state: any) => state.dialogs.items)

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchDialogs())
  }, [dispatch])

  const messages:any = []
  return (
    <div className="main">
      <div className="container">
        <div className="main__wrapper">
          <DialogList items={dialogs} ownerId={ownId} />
          <div className="main__content content">
            <div className="content__header">
              <h3 className="content__title">Иван пупкин</h3>
            </div>
            <div className="content__wrapper">
              {messages.map((item:any) => (
                <Message
                  key={item._id}
                  {...item}
                  isMe={ownId === item.user._id}
                />
              ))}
            </div>
            <div className="content__input">
              <Input placeholder="Введите сообщение" />
              <Button type="primary" shape="circle" icon={<SendOutlined />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DialogsPage
