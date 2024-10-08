import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import DashBoard from './pages/Dashboard.jsx'
import {Routes, Route} from 'react-router-dom'; 
import PrivateRoute from './components/PrivateRoute.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute element={<DashBoard />}  />}/>
      </Routes>
    </>
  )
}

export default App
