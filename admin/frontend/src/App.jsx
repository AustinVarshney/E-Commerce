import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import MainLayout from './Main_Layout/MainLayout';
import LandingPage from './Pages/LandingPage/LandingPage';
import ProductsPage from './Pages/ProductsPage/ProductsPage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<MainLayout />} >
            <Route index element={<LandingPage />} />
            <Route path='/products' element={<ProductsPage />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999 }} />
      {/* <MainLayout /> */}
    </>
  )
}

export default App
