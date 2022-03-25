import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import validator from 'validator';

const Register = () => {

    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
      const userLogin = JSON.parse(localStorage.getItem("login"))
      if (userLogin) {
        setIsLogin(true)
      }else{
        setIsLogin(false)
      }
    }, [])


    const navigate = useNavigate()
    const [obj, setObj] = useState({
        "_id": Math.random().toString().substr(4, 9),
        "userName": "",
        "email": "",
        "password": "",
        "cPassword": "",
        "address": "",
        "city": "",
    })
    const [errorMsg, setErrorMsg] = useState({
        "userName": "",
        "email": "",
        "password": "",
        "cPassword": "",
        "address": "",
        "city": "",
    })

    const changeHandle = (e) => {
        setObj({ ...obj, [e.target.name]: e.target.value })
        setErrorMsg({ ...errorMsg, [e.target.name]: '' })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let flag = true;

        let letters = /^[A-Za-z]+$/

        const email = obj.email
        const userName = obj.userName
        const city = obj.city
        let userNameMsg = ""
        let emailMsg = ""
        let passwordMsg = ""
        let cPasswordMsg = ""
        let addressMsg = ""
        let cityMsg = ""

        if (obj.userName === "") {
            userNameMsg = "Username is Required!"
            flag = false;

        } else if (!userName.match(letters) && obj.userName.length > 4) {
            userNameMsg = "UserName is Wrong!"
            flag = false;
        }
        if (obj.email === "") {
            emailMsg = "Email is Required!"
            flag = false;
        } else if (!validator.isEmail(email)) {
            emailMsg = "Email is not  Valid!"
            flag = false;
        }
        if (obj.password === "") {
            passwordMsg = "Password is Required!"
            flag = false;

        } else if (obj.password.length !== 6) {
            passwordMsg = "Password must be 6 Character!"
            flag = false;
        } if (obj.cPassword === "") {
            cPasswordMsg = "Conform Password is Required!"
            flag = false;
        }
        else if (obj.password !== obj.cPassword) {
            cPasswordMsg = "Password  and Cpassword doesn't match!"
            flag = false;
        }
        if (obj.address === "") {
            addressMsg = "Address is Required!"
            flag = false;

        } if (obj.city === "") {
            cityMsg = "City is Required!"
            flag = false;
        } else if (!city.match(letters)) {
            cityMsg = "City is Wrong!"
            flag = false;
        }
       
        setErrorMsg({
            "userName": userNameMsg,
            "email": emailMsg,
            "password": passwordMsg,
            "cPassword": cPasswordMsg,
            "address": addressMsg,
            "city": cityMsg,
        })
        if (flag) {
            delete obj.cPassword;
            let userData = JSON.parse(localStorage.getItem('userData')) || []
            userData.push(obj)
            localStorage.setItem('userData', JSON.stringify(userData))
            navigate('/login')
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
                        <label className="form-label title">Username:</label>
                        <input type="email" name="userName" className="form-control" value={obj.userName} onChange={(e) => changeHandle(e)} />
                        <div className='errorMain'>
                            {errorMsg.userName !== "" && <div style={{ color: "red" }}>{errorMsg.userName}</div>}
                        </div>
                    </div>
                    <div className="col-12">
                        <label className="form-label title">Email:</label>
                        <input type="email" name="email" className="form-control" value={obj.email} onChange={(e) => changeHandle(e)} />
                        <div className='errorMain'>
                            {errorMsg.email !== "" && <div style={{ color: "red" }}>{errorMsg.email}</div>}
                        </div>
                    </div>
                    <div className="col-12">
                        <label className="form-label title">Password:</label>
                        <input type="password" name="password" className="form-control" value={obj.password} onChange={(e) => changeHandle(e)} />
                        <div className='errorMain'>
                            {errorMsg.password !== "" && <div style={{ color: "red" }}>{errorMsg.password}</div>}
                        </div>
                    </div>
                    <div className="col-12">
                        <label className="form-label title">Conform Password:</label>
                        <input type="password" name="cPassword" className="form-control" value={obj.cPassword} onChange={(e) => changeHandle(e)} />
                        <div className='errorMain'>
                            {errorMsg.cPassword !== "" && <div style={{ color: "red" }}>{errorMsg.cPassword}</div>}
                        </div>
                    </div>

                    <div className="col-12">
                        <label className="form-label title">Address:</label>
                        <textarea type="text" name="address" className="form-control" value={obj.address} placeholder="1234 Main St" onChange={(e) => changeHandle(e)} />
                        <div className='errorMain'>
                            {errorMsg.address !== "" && <div style={{ color: "red" }}>{errorMsg.address}</div>}
                        </div>
                    </div>

                    <div className="col-12">
                        <label className="form-label title">City:</label>
                        <input type="text" name="city" className="form-control" value={obj.city} onChange={(e) => changeHandle(e)} />
                        <div className='errorMain'>
                            {errorMsg.city !== "" && <div style={{ color: "red" }}>{errorMsg.city}</div>}
                        </div>
                    </div>
                    <div className=" col-12 d-flex m-2 justify-content-center" >
                        <button type="submit" className="btn btn-primary " onClick={(e) => handleSubmit(e)}>Sign in</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register