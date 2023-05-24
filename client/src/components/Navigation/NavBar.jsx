import { useState } from 'react'
import { NavLink,useLocation } from 'react-router-dom'
import { ReactComponent as Hamburger } from '../../logo.svg'
import { ReactComponent as Brand } from '../../logo.png'
import logo from '../../logo.png'
import './navbar.css'

const Navbar = (props) => {
  const [showNavbar, setShowNavbar] = useState(false)
  const urlParams = new URLSearchParams(window.location.search);
  const empid = urlParams.get('id');
  const location = useLocation();
  
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar">
      
      <div className="container">
      
      <div className="logo">
          <img src={logo} alt="Work Hour Tracker" style={{ width: '40px', height: '40px' }} />
           
        </div>
        <div> Work Hour Tracker</div>
       
       
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
       
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
          {location.pathname === '/dashboard' ? (
              <li>
                <NavLink to="/">Sign Out</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to={`/summary?id=${empid}`}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={`/employees?id=${empid}`}>Employees</NavLink>
                </li>
                <li>
                <NavLink to="/">Sign Out</NavLink>
              </li>
              </>
            )}
          </ul>
          {/* <div>Employee ID: {empid}</div> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar