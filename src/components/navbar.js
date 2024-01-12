import React from 'react'
import '../css/navbar.css'
const Navbar = () => {
  return (
    <nav className="navbar">
        <h1>To-Do List</h1>
        <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='/about'>About</a></li>
            <li><a href='/contact'>Contact</a></li>
        </ul>
      

    </nav>
      

  )
}

export default Navbar
