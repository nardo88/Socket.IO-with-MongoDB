import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import NotFound from './components/NotFound'
import Auth from './pages/Auth'
import Register from './pages/Register'
import Test from './pages/Test'
import actions from './redux/actions/dialogs'
import actionsMessages from './redux/actions/messages'

function App() {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  useEffect(() => {
    // @ts-ignore
    dispatch(actions.fetchDialogs())
    // @ts-ignore
    dispatch(actionsMessages.fetchMessages('123'))
  }, [dispatch])
  console.log(state)
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
