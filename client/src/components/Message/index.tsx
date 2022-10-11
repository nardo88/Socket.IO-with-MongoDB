import { FC, useState, useRef, useEffect } from 'react'
import './Message.scss'
import dayjs from 'dayjs'
import ReadIcon from '../icons/Read'
import NotReadIcon from '../icons/NotRead'
import AudioIcon from '../icons/Audio'
import PauseIcon from '../icons/PauseIcon'
import PlayIcon from '../icons/PlayIcon'
import Avatar from '../Avatar'
import { FileType, IMessage } from '../../types/Message'



interface MessageProps extends IMessage {
  isMe?: boolean
}

const convertCurrentTime = (number: number) => {
  const mins = Math.floor(number / 60)
  const secs = (number % 60).toFixed()
  return `${mins < 10 ? '0' : ''}${mins}:${Number(secs) < 10 ? '0' : ''}${secs}`
}

const Message:FC<MessageProps> = ({
  isMe,
  createdAt,
  text,
  author,
  attachments,
  isTyping,
  audio,
  unread,
  
}) => {
  const [isPlay, setIsPlay] = useState(false)
  const ref = useRef<HTMLAudioElement>(null) as any
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const togglePlay = () => {
    if (!isPlay) {
      ref.current?.play()
    } else {
      ref.current?.pause()
    }
  }

  useEffect(() => {
    if (audio) {
      ref.current?.addEventListener(
        'playing',
        () => {
          setIsPlay(true)
        },
        false
      )

      ref.current?.addEventListener(
        'ended',
        () => {
          setIsPlay(false)
        },
        false
      )

      ref.current?.addEventListener(
        'pause',
        () => {
          setIsPlay(false)
        },
        false
      )

      ref.current?.addEventListener('timeupdate', () => {
        const duration = (ref.current && ref.current?.duration) || 0
        setCurrentTime(ref.current?.currentTime)
        setProgress((ref.current?.currentTime / duration) * 100)
      })
    }
  }, [audio])

  return (
    <div className={`message ${isMe ? 'message--isme' : ''}`}>
      <div className="message__avatar">
        <Avatar user={author} />
      </div>
      <div className="message__content">
        {text && (
          <div
            className={isMe ? 'message__buble--isme' : 'message__buble--notme'}>
            <p className="message__text">{text}</p>
          </div>
        )}
        {audio && (
          <div className="message__audio audio">
            <div
              className="audio__progress"
              style={{ width: `${progress}%` }}></div>
            <div className="audio__info">
              <div className="audio__control">
                <button className="audio__btn" onClick={togglePlay}>
                  {isPlay ? <PauseIcon /> : <PlayIcon />}
                </button>
              </div>
              <audio ref={ref} src={audio} preload="auto" />
              <AudioIcon />
              <span className="audio__duration">
                {convertCurrentTime(currentTime)}
              </span>
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
          {isMe && <span> {unread ? <ReadIcon /> : <NotReadIcon />}</span>}
          {createdAt && (
            <span className={`message__date ${isMe && 'ml8'}`}>
              {dayjs(createdAt).format('DD.MM.YYYY')}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message
