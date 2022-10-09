import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DialogList from '../../components/Dialogs/DialogsList'
import { fetchDialogs } from '../../redux/reducers/dialogs'
import { IDialogItem } from '../../types/Dialog'
import socket from '../../utils/socket'
import Content from '../../components/Content'
import './Dialogs.scss'

const DialogsPage = () => {
  const dispatch = useDispatch()
  const ownId = useSelector((state: any) => state.user.data._id)
  const dialogs: IDialogItem[] = useSelector(
    (state: any) => state.dialogs.items
  )

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchDialogs())

    socket.on('DIALOG_CREATED', ({ author, partner }: {author: string, partner: string}) => {
      if (ownId === author || ownId === partner) {
        // @ts-ignore
        dispatch(fetchDialogs())
      }
    })
  }, [dispatch, ownId])

  return (
    <div className="main">
      <div className="container">
        <div className="main__wrapper">
          <DialogList items={dialogs} ownerId={ownId} />
          <Content ownId={ownId} />
        </div>
      </div>
    </div>
  )
}

export default DialogsPage
