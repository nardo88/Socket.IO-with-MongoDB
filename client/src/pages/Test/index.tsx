import Message from '../../components/Message'

const avatar =
  'https://sun1-30.userapi.com/s/v1/ig2/IQg8pIe0OhB375-ioMb5ufiE1kbyM1btJik63fR4rKcXKAMSW9AvJdwE9uUY0cNq75YYxBuZY3199thmDQrWYnKI.jpg?size=100x100&quality=96&crop=86,86,689,689&ava=1'

const Test = () => {
  return (
    <div className="wrapper">
      <Message 
        user={{fullName: 'Иван Пупкин'}}
        content={'Привет! как дела?'} 
        avatar={avatar}
        isMe={false}
        date={'2022.09.02: 21:21'}
      />
      <Message 
        user={{fullName: 'Иван Пупкин'}}
        content={null} 
        avatar={avatar}
        isMe={false}
        audio={'1'}
        date={'2022.09.02: 21:21'}
      />
    </div>
  )
}

export default Test
