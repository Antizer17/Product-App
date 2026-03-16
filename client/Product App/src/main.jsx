import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import Navbar from './App.jsx'
import Homepage from './components/home.jsx'
import CreatePage from './components/create.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/'element={<Homepage />}/>
      <Route path='/create'element={<CreatePage />}></Route>
    </Routes>
  </BrowserRouter>

)
