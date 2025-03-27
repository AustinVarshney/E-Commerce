import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/AuthPage/Auth';
import Home from './pages/Home/Home'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='auth' element={<Auth />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
