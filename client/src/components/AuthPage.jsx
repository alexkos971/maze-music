import React, { useState, useEffect, useContext, useRef } from 'react';
import { Route, Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { Context } from '../context';

import { changeAuth } from '../redux/actions';

import { ReactComponent as Logo } from '../assets/img/Logo.svg';

const AuthPage = ({ dispatch, authType }) => {

    const [form, setForm] = useState({
        name: '', email: '', password: ''
    });
    const history = useHistory();
    const ref = useRef('input_teg')

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
                message(data.message)
                history.push('/auth')
            }
        }
        catch (e) {
            message(e.message)
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
            message(e.message)
        }
    }

    const recoveryHandler = async () => {
        try {
            if (!authType) {
                const data = await request('/api/auth/checkEmail', 'POST', { email: form.email});

                if (data) {
                    dispatch(changeAuth(true));
                    console.log(ref.current.value)
                }

            }
            else {

                const pass = await request('/api/auth/recovery', 'POST', { password: form.password});
                if (pass) {
                    history.push('/auth')
                }
            }
        }
        catch (e) {
            message(e.message)
        }
    }

    setTimeout(() => {
        setLoad(true);
    }, 2200);

    return (
        <div className="music__auth">
            {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/> */}
            {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>   */}

            <div className={`music__auth-logo`}>
                <Logo />
            </div>
            <div className="music__auth_bg"></div>
            
        {load &&  

            <div className="music__auth-form">

            <Route path="/auth">
                <h1>Login</h1>
                
                <form>
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
                        <button onClick={loginHandler} disabled={loading}>Login</button>
                        <Link to="/register" id="btn_nonreg">Register</Link>
                    </div>
                </form> 
            </Route>

            <Route path="/register">
                <h1>Register</h1>

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
                    <button onClick={registerHandler} disabled={loading}>Register</button>
                        <Link to="/auth" id="btn_nonreg">Login</Link>
                    </div>
                </form>
            </Route>

            <Route path="/recovery">
                <h1>Recovery password</h1>

                {!authType ? 
                    <form>
                        <input 
                            type="text" 
                            placeholder="example@gmail.com"
                            id="email"
                            name="email"
                            ref={ref}
                            onChange={changeHandler}/>

                        <div className="music__auth-form-btns">
                            <button onClick={recoveryHandler} disabled={loading}>Send</button>
                        </div>
                    </form>
                : 
                
                    <form>
                        <input 
                            type="text" 
                            placeholder="password"
                            id="password"
                            name="password"
                            onChange={changeHandler}/>

                        <div className="music__auth-form-btns">
                            <button onClick={recoveryHandler} disabled={loading}>Send</button>
                        </div>
                    </form>
                }
            </Route>

            <Link to="/recovery">
                <span className="music__auth-form-forgot">Forgot password ?</span>
            </Link>
            
            </div>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        authType: state.changeDir.auth
    }
}

export default connect(mapStateToProps)(AuthPage);