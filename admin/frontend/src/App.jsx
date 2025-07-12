import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import MainLayout from './Main_Layout/MainLayout';
import LandingPage from './Pages/LandingPage/LandingPage';
import Product from './Pages/Product/Product';

function App() {

  return (
    <>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999 }} />
        <Routes>
          <Route path='/' element={<MainLayout />} >
            <Route index element={<LandingPage />} />
            <Route path='/products' element={<Product />} />
          </Route>
        </Routes>
      </Router>
      {/* <MainLayout /> */}
    </>
  )
}

export default App
