import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import Navbar from './App.jsx'
import Homepage from './components/home.jsx'
import CreatePage from './components/create.jsx'
import Login from './components/loginPage.jsx'
import Register from './components/RegisterPage.jsx'
import LoginStatus from './components/loginStatus.jsx'
import Footer from './components/footer.jsx'
import { useLocation } from 'react-router-dom'

const AppContent = () => {
  const location = useLocation();
  
  // Check if current path is login or register
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {/* Navbar only shows if NOT on login/register */}
      {!isAuthPage && <Navbar />}
      
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

      {/* Footer only shows if NOT on login/register */}
      {!isAuthPage && <Footer />}
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
 
)
