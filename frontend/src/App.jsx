import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import BorderDesign from './components/BorderDesign/BorderDesign';
import { AuthProvider } from './Context/AuthContext';
import Auth from './pages/AuthPage/Auth';
import Home from './pages/Home/Home';
import MainLayout from './pages/MainLayout/mainLayout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path='auth' element={<Auth />} />
              <Route path='borderTest' element={<BorderDesign />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  )
}

export default App
