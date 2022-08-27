import Message from '../../components/Message'
import dayjs from 'dayjs'

const Test = () => {
  const message = {
    user: {
      fullName: 'Макс',
    },
    avatar:
      'https://sun1-89.userapi.com/s/v1/if1/IxsfJzF-ZhbP8tqgW8vhIQ44IcJAg0Xo8ESPGFVU5tfqgJ_lioW4JTa0w7rCrhJdkBq0iOHb.jpg?size=100x100&quality=96&crop=48,48,384,384&ava=1',
    date: dayjs().valueOf(),
    content:
      'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты.',
  }

  return (
    <div className="wrapper">
      <Message {...message} />

      <Message {...message} isMe={true} isRead={true} />
      <Message {...message} />
      <Message {...message} isMe={true} isRead={false} />
    </div>
  )
}

export default Test
