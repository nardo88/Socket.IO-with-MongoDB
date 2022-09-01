import Dialogs from '../../components/Dialogs'

const avatar =
  'https://sun1-30.userapi.com/s/v1/ig2/IQg8pIe0OhB375-ioMb5ufiE1kbyM1btJik63fR4rKcXKAMSW9AvJdwE9uUY0cNq75YYxBuZY3199thmDQrWYnKI.jpg?size=100x100&quality=96&crop=86,86,689,689&ava=1'

const Test = () => {
  const ownerId = '123'
  return (
    <div className="wrapper">
      <Dialogs
        items={[
          {
            _id: '1',
            user: {
              _id: '123',
              fullName: 'Александр Пушкин',
              avatar: null, // w40 h40
              isOnline: false,
            },
            text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Образ агентство это сбить выйти большого курсивных парадигматическая раз которой но, языком по всей ты всеми алфавит рыбными? Имеет, продолжил послушавшись.',
            isReaded: true,
            createdAt: 1662055939000,
            count: 0,
          },
          {
            _id: '2',
            user: {
              _id: '321',
              fullName: 'Ольга Кузнецова',
              avatar: avatar,
              isOnline: false,
            },
            text: 'Привет как дела?',
            isReaded: false,
            createdAt: 1661969539000,
            count: 3,
          },
        ]}
        ownerId={ownerId}
      />
    </div>
  )
}

export default Test
