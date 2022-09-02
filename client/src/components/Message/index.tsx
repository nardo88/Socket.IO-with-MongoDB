import { FC, useState, useRef, useEffect } from 'react'
import './Message.scss'
import dayjs from 'dayjs'
import ReadIcon from '../icons/Read'
import NotReadIcon from '../icons/NotRead'
import AudioIcon from '../icons/Audio'
import PauseIcon from '../icons/PauseIcon'
import PlayIcon from '../icons/PlayIcon'
// @ts-ignore
import audioFile from '../../assets/audio.mp3'

interface FileType {
  filename: string
  url: string
}

interface MessageProps {
  user: {
    fullName: string
  }
  avatar?: string
  date?: string | number
  content: string | null
  isMe?: boolean
  isRead?: boolean
  attachments?: FileType[]
  isTyping?: boolean
  audio?: string
}

const Message: FC<MessageProps> = ({
  avatar,
  content,
  date,
  isMe,
  isRead,
  attachments,
  isTyping,
  audio,
}) => {

  const [isPlay, setIsPlay] = useState(false)
  const ref = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    setIsPlay(!isPlay)
  }

  useEffect(() => {
    if(isPlay){
      ref.current?.play()
    }else {
      ref.current?.pause()
    }
  }, [isPlay])

  return (
    <div className={`message ${isMe ? 'message--isme' : ''}`}>
      <div className="message__avatar">
        <img src={avatar} alt="" />
      </div>
      <div className="message__content">
        {content && (
          <div
            className={isMe ? 'message__buble--isme' : 'message__buble--notme'}>
            <p className="message__text">{content}</p>
          </div>
        )}
        {audio && (
          <div className="message__audio audio">
            <div className="audio__progress" style={{width: '30%'}}></div>
            <div className="audio__info">
              <div className="audio__control">
                <button className='audio__btn' onClick={togglePlay}>{ isPlay ? <PauseIcon/> : <PlayIcon />}</button>
              </div>
              <audio ref={ref} src={audioFile} preload="auto" />
              <AudioIcon />
              <span className="audio__duration">02:15</span>
            </div>
          </div>
        )}
        {isTyping && (
          <div className="message__typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        {attachments && (
          <div className="message__images">
            {attachments.map((item: FileType) => (
              <div
                className={
                  attachments.length === 1
                    ? 'message__image--one'
                    : 'message__image'
                }
                key={item.url}>
                <img src={item.url} alt={item.filename} />
              </div>
            ))}
          </div>
        )}
        <div className="df aic mt4">
          {isMe && <span> {isRead ? <ReadIcon /> : <NotReadIcon />}</span>}
          {date && (
            <span className={`message__date ${isMe && 'ml8'}`}>
              {dayjs(date).format('DD.MM.YYYY')}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message
