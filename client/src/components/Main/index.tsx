import GroupIcon from '../icons/GroupIcon'
import WriteIcon from '../icons/WriteIcon'
import './Main.scss'

import users from './users.json'

import { Input } from 'antd'
import Dialogs from '../Dialogs'
const { Search } = Input



const Main = () => {
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
                <Dialogs ownerId='EWmE2MJFPGU2thO3' items={users} />
            </div>
          </div>
          <div className="main__content"></div>
        </div>
      </div>
    </div>
  )
}

export default Main
