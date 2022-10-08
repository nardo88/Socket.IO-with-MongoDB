import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import NotFound from './components/NotFound'
import Auth from './pages/Auth'
import Confirm from './pages/Confirm'
import DialogsPage from './pages/Dialogs'
import Register from './pages/Register'
import { fetchUserData } from './redux/reducers/user'

function App() {
  const isAuth = useSelector((state: any) => state.user.isAuth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if(!isAuth){
      // @ts-ignore
      dispatch(fetchUserData())
    }
  }, [dispatch, isAuth])

  useEffect(() => {
    if (isAuth) {
      navigate('/dialogs')
    }
  }, [isAuth, navigate])
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
            <Route path="/dialogs" element={<DialogsPage />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
