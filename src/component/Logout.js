import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Logout = ({setIsLogged}) => {
    const navigate = useNavigate()
    useEffect(() => {
            localStorage.removeItem("token")
            localStorage.removeItem("login")
            localStorage.clear();
            setIsLogged(false)
            navigate("/")
    }, [])
return(
<>
{/* {handleSubmit()}  */}
</>) 

// return <Navigate to="/login" />
}

export default Logout