import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import MovingBorder from './components/MovingBorder/MovingBorder';
import { AuthProvider } from './Context/AuthContext';
import Auth from './pages/AuthPage/Auth';
import Home from './pages/Home/Home';
import MainLayout from './pages/MainLayout/mainLayout';
import ProductCard from './components/ProductCard/ProductCard';
import AllProducts from './components/AllProducts/AllProducts';

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
              <Route path='products' element={<AllProducts/>} />
              <Route path='borderTest' element={<MovingBorder />} />
              <Route path='cardRoute' element={<ProductCard/>} />              
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  )
}

export default App
