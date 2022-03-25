import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const Navbar = ({isLogged}) => {
  // const [isLogged, setIsLogged] = useState(false)  
  useEffect(() => {
  const userLogin = localStorage.getItem("login")
//  if(userLogin){
//    setIsLogged(true)
//  }else{
//    setIsLogged(false)
//  }
  }, [])
  
    return (
        <>
            <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <ul className="navbar mr-auto">
          <li className="nav-link">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
        </ul>
        {!isLogged && 
        <ul className="navbar mr-auto">
          <li className="nav-link">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
        </ul>
        }
        {!isLogged ? <ul className="navbar mr-auto">
          <li className="nav-link">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul> :
        <ul className="navbar mr-auto">
          <li className="nav-link">
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      }
      </nav>
    </div>

    <Outlet />

        </>
    )
}

export default Navbar