import GroupIcon from '../icons/GroupIcon'
import WriteIcon from '../icons/WriteIcon'
import './Main.scss'

import messages from './dialog.json'

import { Input } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Dialogs from '../Dialogs'
import Message from '../Message'
import { useSelector } from 'react-redux'
const { Search } = Input

const Main = () => {
  const ownId = useSelector((state: any) => state.user.data._id)
  const dialogs = useSelector((state: any) => state.dialogs.items)
  console.log(dialogs)
  return (
    <div className="main">
      <div className="container">
        <div className="main__wrapper">
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
              <Dialogs ownerId={ownId} items={dialogs} />
            </div>
          </div>
          <div className="main__content content">
            <div className="content__header">
              <h3 className="content__title">Иван пупкин</h3>
            </div>
            <div className="content__wrapper">
              {messages.map((item) => (
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

export default Main
