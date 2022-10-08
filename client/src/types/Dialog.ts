export interface IMember {
    id: string
    avatar: string
    name: string
    isOnline?: boolean
}

interface ILastMessage {
    message: string
    readed: boolean
    userId: string
}

export interface IDialogItem {
    id: string
    author: IMember
    partner: IMember
    lastMessage: ILastMessage
    updatedAt: Date
}