import Message from '../../components/Message'
import dayjs from 'dayjs'

const url1 = 'https://uproger.com/wp-content/uploads/2021/12/cover-a1d5b40.png'
const url2 =
  'https://fuzeservers.ru/wp-content/uploads/a/6/d/a6d05477e67baf048d57ff6d15696f56.jpeg'
const url3 =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/800px-Typescript_logo_2020.svg.png'

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
      <Message
        {...message}
        isMe={true}
        isRead={false}
        attachments={[
          { filename: 'React1', url: url1 },
          { filename: 'Node', url: url2 },
          { filename: 'TypeScript', url: url3 },
        ]}
      />
    </div>
  )
}

export default Test
