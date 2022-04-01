import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import * as sessionActions from '../../store/session';

import './LoginForm.css';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) {
        return <Redirect to='/' />
    }

    const handleSubmit = e => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ email, password }))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };

    return (
        <div className='login__form__container'>
            <div>
                <div className='login__form__box'>
                    <div className='login__title'>
                        Log In to Whelp
                    </div>
                    <div className='login__subtitle'>
                        New to Whelp?
                        <Link className='switching' to='/signup'>
                            Sign Up
                        </Link>
                    </div>
                    <form className='login__form' onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <div className='login__form' >
                            <input
                                className='input__login'
                                type='email'
                                value={email}
                                placeholder='Email'
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <input
                                className='input__login'
                                type='password'
                                value={password}
                                placeholder='Password'
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            className='red__button login__button all__buttons'
                            type='submit'
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
            <div>
                <img className='login__image' src={require('../../images/login_dog.png')} />
            </div>
        </div>
    )
};

export default LoginFormPage;
