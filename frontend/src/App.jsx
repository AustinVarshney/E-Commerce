import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Auth from './components/AuthPage/Auth'
import Home from './pages/Home/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/'>
          <Route path='auth' element={<Auth/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
