import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

export default function PrivateRoute({ children }) {
    const [isLogged, setIsLogged] = useState(true)
    const navigate  = useNavigate() 
    useEffect(() => {
      const userLogin = JSON.parse(localStorage.getItem("login"))
      if (userLogin) {
        setIsLogged(true)
      }else{
        setIsLogged(false)
      }
    }, [])
    console.log("isLogged",isLogged);
    if(!isLogged){
      return <Navigate to="/login" />
    }
    return children
    }