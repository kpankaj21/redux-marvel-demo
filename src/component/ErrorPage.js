import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const ErrorPage = () => {
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
      const userLogin = JSON.parse(localStorage.getItem("login"))
      if (userLogin) {
        setIsLogin(true)
      }else{
        setIsLogin(false)
      }
    }, [])

    if(isLogin){
        return <Navigate to="/" />
      }
  return (
    <div style={{color:"red"}}>Error 404: Page not Found!</div>
  )
}

export default ErrorPage