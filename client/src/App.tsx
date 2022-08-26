import { Route, Routes } from 'react-router-dom'
import NotFound from './components/NotFound'
import Auth from './pages/Auth'
import Register from './pages/Register'
import Test from './pages/Test'

function App() {
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
