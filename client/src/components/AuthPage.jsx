import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { Context } from '../context';

import LogoImg from '../assets/img/maze_2.png';

const AuthPage = () => {

    const [form, setForm] = useState({
        name: '', email: '', password: ''
    });

    const [ load, setLoad ] = useState(false);

    const auth = useContext(Context);
    const { loading, request, error } = useHttp();
    const message = useMessage();

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            if (data) {
                auth.login(data.token, data.userId, data.name, data.email);
            }
        }
        catch (e) {
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            if (data) {
                auth.login(data.token, data.userId, data.name, data.email);
            }
        }
        catch (e) {

        }
    }

    useEffect(() => {
        message(error);
    }, [error, message]);

    setTimeout(() => {
        setLoad(true);
    }, 2200);

    return (
        <div className="music__auth">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>  

            <div className={`music__auth-logo`}>
                <img src={LogoImg} alt="" />
                <h1>Maze music</h1>
            </div>
            <div className="music__auth_bg"></div>
            
        {load &&  

            <div className="music__auth-form">
                <h1>Login or register</h1>
                
                <form>
                    <input 
                        type="text" 
                        placeholder="Your_Name"
                        id="name"
                        name="name"
                        onChange={changeHandler}/>

                    <input 
                        type="text" 
                        placeholder="example@gmail.com"
                        id="email"
                        name="email"
                        onChange={changeHandler}/>

                    <input 
                        type={"password"}
                        placeholder="11111111"
                        id="password"
                        name="password"
                        onChange={changeHandler}/>

                    <div className="music__auth-form-btns">
                        <button onClick={loginHandler} disabled={loading}>Войти</button>
                        <button onClick={registerHandler} disabled={loading}>Зарегестрироваться</button>
                    </div>
                </form>
            </div>}
        </div>
    );
}

export default AuthPage;