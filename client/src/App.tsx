import { Route, Routes } from 'react-router-dom'
import NotFound from './components/NotFound'
import Auth from './pages/Auth'
import Register from './pages/Register'

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />


      </Routes>
      
    </div>
  )
}

export default App
