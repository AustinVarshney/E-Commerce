import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import MainLayout from './Main_Layout/MainLayout';
import LandingPage from './Pages/LandingPage/LandingPage';
import ProductsPage from './Pages/ProductsPage/ProductsPage';
import Navbar from '../Components/Navbar/Navbar';

function App() {

  return (
    <>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999 }} />
        <Routes>
          <Route path='/' element={<MainLayout />} >
            <Route index element={<LandingPage />} />
            <Route path='/products' element={<ProductsPage/>} />
          </Route>
        </Routes>
      </Router>
      {/* <MainLayout /> */}
    </>
  )
}

export default App
