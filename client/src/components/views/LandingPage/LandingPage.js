import React, { useEffect } from 'react'
import axios from 'axios'
import {withRouter, Link} from 'react-router-dom';

function LandingPage(props){ 

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success){
                props.history.push('/login');
            } else {
                alert('로그아웃 하는 데 실패하였습니다.');
            }
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <div style={{
                display: 'flex',flexDirection: 'column', width: '100px'
            }}>
                <h2>시작 페이지</h2>
                <button onClick={onClickHandler}>
                    로그아웃
                </button>
                
                
            </div>
            
        </div>
        
    )
}
export default withRouter(LandingPage)
