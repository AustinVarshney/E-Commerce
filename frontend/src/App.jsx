import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Auth from './components/AuthPage/Auth'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'>
          <Route path='auth' element={<Auth/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
