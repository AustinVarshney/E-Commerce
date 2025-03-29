import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Auth from './pages/AuthPage/Auth';
import Home from './pages/Home/Home';
import MainLayout from './pages/MainLayout/mainLayout';
import BorderDesign from './components/BorderDesign/BorderDesign';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='auth' element={<Auth/>} />
            <Route path='borderTest' element={<BorderDesign/>} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
