import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action'
import {withRouter, Link} from 'react-router-dom';

function LoginPage(props){
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    } 
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault()

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess){
                props.history.push('/');
            } else {
                alert('Error ');
            }
        })
    }


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column', border: '1px solid black', padding: '30px'}}
                onSubmit={onSubmitHandler}
            >
                <div style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    width: '100%', height: '10vh'
                }}>
                    <h2>LOGIN</h2>
                </div>
                
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <br />
                <button>
                    Login
                </button>
                <br />
                <button onClick={() => props.history.push('/register')}>
                    Sign Up
                </button>
                
            </form>
        </div>
    )
}

export default withRouter(LoginPage)