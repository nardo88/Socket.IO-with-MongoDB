import Message from '../../components/Message'
import dayjs from 'dayjs'
import Dialogs from '../../components/Dialogs'
import DialogItem from '../../components/Dialogs/DialogItem'

const Test = () => {
  return (
    <div className="wrapper">
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />

      {/* <Dialogs
        items={[
          {
            user: {
              fullName: 'Александр Пушкин',
              avatart: null, // w40 h40
            },
            message: {
              text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Образ агентство это сбить выйти большого курсивных парадигматическая раз которой но, языком по всей ты всеми алфавит рыбными? Имеет, продолжил послушавшись.',
              isReaded: false,
              createdAt: Date.now(),
              isMe: false,
            },
          },
        ]}
      /> */}
    </div>
  )
}

export default Test
