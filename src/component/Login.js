import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import validator from 'validator';


const Login = ({setIsLogged}) => {


    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
      const userLogin = JSON.parse(localStorage.getItem("login"))
      if (userLogin) {
        setIsLogin(true)
      }else{
        setIsLogin(false)
      }
    }, [])
   
    console.log("isLogin+++",isLogin);


    const [obj, setObj] = useState({
        "email": "",
        "password": "",
    })
    const [userData, setUserData] = useState([])
    const [errorMsg, setErrorMsg] = useState({
        "userName": "",
        "email": "",
    })
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        setUserData(userData)
    }, [])
    const navigate = useNavigate()    
    const changeHandle = (e) => {
        setObj({ ...obj, [e.target.name]: e.target.value })
        setErrorMsg({ ...errorMsg, [e.target.name]: '' })
    }

    const handleLogin =(e) => {
        e.preventDefault()
        let flag = true;


        let letters = /^[A-Za-z]+$/

        const email = obj.email
        let emailMsg = ""
        let passwordMsg = ""

        if (obj.email === "") {
            emailMsg = "Email is Required!"
            flag = false;
        } else if (!validator.isEmail(email)) {
            emailMsg = "Email is Not Valid!"
            flag = false;
        }
        if (obj.password === "") {
            passwordMsg = "Password is Required!"
            flag = false;

        } 
        
        setErrorMsg({
            "email": emailMsg,
            "password": passwordMsg,
        })
        if(flag){
            let userLogin = userData?.find(item => item.email === obj.email && item.password === obj.password)
            if(userLogin){
                localStorage.setItem('token',userLogin._id)
                localStorage.setItem('login',true)
                setIsLogged(true)
                navigate('/')
            }else{
                alert("UserName and Password is InCorrect")
            }
        }
    }
    if(isLogin){
        return <Navigate to="/" />
      }
    return (
        <>
            <div className='container p-4 ' style={{ width: "50%" }} >
                <form className="row">
                <div className="col-12">
                        <label className="form-label title">Email:</label>
                        <input type="email" name="email" className="form-control" value={obj.email} onChange={(e) => changeHandle(e)} />
                        <div className='errorMain'>
                        {errorMsg.email !== "" && <div style={{color:"red"}}>{errorMsg.email}</div>}
                        </div>

                    </div>

                    <div className="col-12">
                        <label className="form-label title">Password:</label>
                        <input type="password" name="password" className="form-control" value={obj.password} onChange={(e) => changeHandle(e)} />
                        <div className='errorMain'>
                        {errorMsg.password !== "" && <div  style={{color:"red"}}>{errorMsg.password}</div>}
                        </div>

                    </div>
                    <div className=" col-12 d-flex m-2 justify-content-center" >
                        <button type="submit" className="btn btn-primary  " onClick={(e) => handleLogin(e)}>Login </button>
                    </div>
                    <div className=" col-12 d-flex mt-3 justify-content-center" >
                        Sign in?<Link to='/register'>Register</Link>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Login