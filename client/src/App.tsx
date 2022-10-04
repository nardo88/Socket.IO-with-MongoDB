import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import NotFound from './components/NotFound'
import Auth from './pages/Auth'
import Confirm from './pages/Confirm'
import Register from './pages/Register'
import Test from './pages/Test'
import actions from './redux/actions/user'

function App() {
  const isAuth = useSelector((state: any) => state.user.isAuth)
  const state = useSelector((state: any) => state)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    // @ts-ignore
    dispatch(actions.fetchUserData())
  }, [dispatch])

  useEffect(() => {
    if (isAuth) {
      navigate('/dialogs')
    }
  }, [isAuth, navigate])
  console.log(state)
  return (
    <div className="wrapper">
      <Routes>
        {!isAuth ? (
          <>
            <Route path="/" element={<Auth isAuth={isAuth} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/confim" element={<Confirm />}>
              <Route path=":hash" element={<Confirm />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/dialogs" element={<Test />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
