import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import MainLayout from './Main_Layout/MainLayout'

function App() {

  return (
    <>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999 }} />
        <Routes>
          <Route path='/products' />
        </Routes>
      </Router>
      <MainLayout />
    </>
  )
}

export default App
