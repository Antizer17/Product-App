import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import logo from "../src/assets/hero.png"


function Navbar() {
  const [count, setCount] = useState(0)

  return(
    <nav className='container'>
      <img id='hero' src={logo} alt='Hero.png'/>
      <Link className='link' to="/">Home</Link>
      <Link className='link' to={"/create"}>Create Page</Link>
    </nav>
  )
    
}

export default Navbar;
