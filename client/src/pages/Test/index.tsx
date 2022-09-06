import Message from '../../components/Message'
// @ts-ignore
import audioFile from '../../assets/audio.mp3'
import Main from '../../components/Main'
const avatar =
  'https://sun1-30.userapi.com/s/v1/ig2/IQg8pIe0OhB375-ioMb5ufiE1kbyM1btJik63fR4rKcXKAMSW9AvJdwE9uUY0cNq75YYxBuZY3199thmDQrWYnKI.jpg?size=100x100&quality=96&crop=86,86,689,689&ava=1'

const Test = () => {
  return (
    // <div className="wrapper">
    //   <Message 
    //     user={{
    //       _id: 'I7hIaRORK8CM73x0',
    //       fullName: 'Иван Пупкин', 
    //       avatar: null
    //     }}
    //     content={'Привет! как дела?'} 
    //     isMe={false}
    //     date={'2022.09.02: 21:21'}
    //   />
    //   <Message 
    //     user={{_id: 'VQaigeIu0deS0Myd', fullName: 'Иван Пупкин', avatar}}
    //     content={null} 
    //     isMe={false}
    //     audio={audioFile}
    //     date={'2022.09.02: 21:21'}
    //   />
    // </div>
    <Main />
  )
}

export default Test
