import logo from './logo.svg';
import './App.css';
import Register from './component/Register';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Navbar from './component/Navbar';
import { useEffect, useState } from 'react';
import Logout from './component/Logout';
import PrivateRoute from './component/PrivateRoute';
import ComicDetail from './component/ComicDetail';
import { useSelector } from 'react-redux';
import ErrorPage from './component/ErrorPage';

function App() {
  const [isLogged, setIsLogged] = useState(false)
  const [isLoader, setIsLoader] = useState(false)

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("login"))
    if (userLogin) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  }, [])
  const loader = useSelector(state => state?.dashboardReducer?.loading)
  useEffect(() => {
    if (loader) {
      setIsLoader(true)
    } else {
      setIsLoader(false)
    }
  }, [loader])
  return (
    <>

      <div style={{overflowX:"hidden"}}>
        <Navbar isLogged={isLogged} />
        <Routes>
          <Route exact path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route exact path='/register' element={<Register />} />
          <Route path='/login' element={<Login setIsLogged={setIsLogged} />} />
          <Route path='/logout' element={<Logout setIsLogged={setIsLogged} />} />
          <Route exact path='/comicdetail' element={<ComicDetail />} />
          <Route exact path='*' element={<ErrorPage />} />
        </Routes>
      </div>
       

    </>
  );
}

export default App;
