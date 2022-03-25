import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import fetchComicData, { dashBoardSuccess }  from '../Redux/action/Login.action';
import {Typography,Card,CardContent} from '@material-ui/core'
import Image from 'material-ui-image'
import ComicDetail from './ComicDetail';
 
const Home = () => {
   
        const [startPage, setStartPage] = useState(1);
        const [offsetPage, setOffsetPage] = useState(10);
          const dispatch = useDispatch()
          const navigate = useNavigate()

          const comicData = useSelector(state => state?.dashboardReducer?.comicsData)
          const loader = useSelector(state => state?.dashboardReducer?.loading)
          useEffect(() => {
              if(comicData.length > 0 ){
                  dispatch(dashBoardSuccess([]))
              }
          }, [])
          
          useEffect(() => {
                dispatch(fetchComicData(offsetPage,startPage))
          }, [offsetPage,startPage])
          window.onscroll = function () {
            let scrollingDown =
              document.documentElement.scrollTop <
              document.documentElement.scrollHeight -
              document.documentElement.clientHeight;
            if (scrollingDown === false) {
              scrollTOEnd();
            }
          };
          const scrollTOEnd = () => {
            setStartPage(startPage + 10);
          };
          const clickHandler = (item) =>{
            const comicData = item;
            const record = JSON.stringify(item);
            localStorage.setItem("comicData",record)
            navigate('/ComicDetail')
          }
  return (
    <>
    <div className='row'>
   
        {comicData && comicData.length > 0 && comicData.map((item, index) => {
          return (
            <div className='col-md-3 p-3' key={index}>
              <Card>
                <CardContent style={{ height:'400px'}}>
                  <div style={{display: 'flex', justifyContent: 'center' }}>
                    <Image
                      alt={item.title}
                      src={item.thumbnail.path + '.' + item.thumbnail.extension}
                      title={item.title}
                      style={{width: 230,marginTop:'5px',padding: 0,height: 300,align: 'center'}}
                      disableSpinner
                      onClick={()=>clickHandler(item)}
                    />
                  </div>
                  <Typography className='d-flex align-items-center justify-content-center' style={{minHeight: '64px'}} /* gutterBottom variant='h6' */ component='p' color='primary'>{item.title}</Typography> 
                  </CardContent>
              </Card>
            </div>
          )
        })}
          <div className='col-12 d-flex justify-content-center p-3'>
            <div class="spinner-border" role="status" >
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
      </div>
    </>

  )
}

export default Home