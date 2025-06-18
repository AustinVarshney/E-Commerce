import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AllProducts from './components/AllProducts/AllProducts';
import MovingBorder from './components/MovingBorder/MovingBorder';
import ProductCard from './components/ProductCard/ProductCard';
import { AuthProvider } from './Context/AuthContext';
import Auth from './pages/AuthPage/Auth';
import OAuthSuccess from './pages/AuthPage/OAuthSuccess/oauthSuccess';
import Contact from './pages/Contact/contact';
import Home from './pages/Home/Home';
import MainLayout from './pages/MainLayout/mainLayout';
import SingleProduct from './pages/SingleProduct/SingleProduct';
import CartPage from './pages/CartPage/CartPage';

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
              <Route path='products' element={<AllProducts />} />
              <Route path='product' element={<SingleProduct />} />
              <Route path='borderTest' element={<MovingBorder />} />
              <Route path='cardRoute' element={<ProductCard />} />
              <Route path='oauth-success' element={<OAuthSuccess />} />
              <Route path='contact' element={<Contact />} />
              <Route path='cart' element={<CartPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  )
}

export default App
