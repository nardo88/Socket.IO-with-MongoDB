export interface IMessage {
  author: {
    id: string
    fullName: string
    avatar: string | null | undefined
  }
  id: string
  dialog: string
  text: string
  unread: boolean
  createdAt: Date
  attachments?: FileType[]
  isTyping?: boolean
  audio?: string | null | undefined

}

export interface FileType {
  filename: string
  url: string
}
