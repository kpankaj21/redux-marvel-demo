import React, { useState } from 'react'
import {Typography,Card,CardContent,Button} from '@material-ui/core'
import Image from 'material-ui-image'

export default function ComicDetail() {
    const [pageBack, setPageBack] = useState(false)
    const comicDetail = JSON.parse(localStorage.getItem('comicData'));
    console.log("comicDetail",comicDetail);
    const pageBackHandler = () =>{
        localStorage.removeItem('comicData')
        setPageBack(true)
    }
    return (
        <Card width='50%'>
            <div className='back'>
                    </div>
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                      alt={comicDetail.title}
                      src={comicDetail.thumbnail.path + '.' + comicDetail.thumbnail.extension}
                      title={comicDetail.title}
                      style={{width:'40%',marginTop:'5px',padding: 0,height:400,align: 'center'}}
                      disableSpinner
                    />
                </div>
                <Typography className='comicLabel' style={{minHeight: '64px'}} gutterBottom variant='h5' component='p' color='primary'>
                  Title:{comicDetail.title}
                </Typography>
                <br/>
                <Typography className='comicLabel' style={{ fontWeight: 500 }} color='secondary' component='p'>
                    Description:- {comicDetail.description}
                </Typography>
                <br/>
                <Typography className='comicLabel' style={{ fontWeight: 500 }} variant='h6' color='primary' component='p'>
                </Typography>
              </CardContent>
            </Card>
    )
}