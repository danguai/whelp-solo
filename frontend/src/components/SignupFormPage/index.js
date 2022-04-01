import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import * as sessionActions from '../../store/session';

import './SignupForm.css';

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [imageProfile, setImageProfile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState([]);

    if (sessionUser) {
        return <Redirect to='/' />;
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({
                firstName,
                lastName,
                email,
                imageProfile,
                password,
                confirmPassword
            }))
                .catch(async res => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors([`Confirm Password should match Password`]);
    };

    return (
        <div className='signup__form__container'>
            <div>
                <img className='signup__image' src={require('../../images/signup_dog.png')} />
            </div>
            <div>
                <div className='signup__form__box'>
                    <div className='signup__title'>
                        Sign Up for Whelp
                    </div>
                    <form className='signup__form' onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <div className='signup__full__name'>
                            <div>
                                <input
                                    placeholder='First Name'
                                    className='full__input__signup'
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    placeholder='Last Name'
                                    className='full__input__signup'
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <input
                                placeholder='Email'
                                className='input__signup'
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                placeholder='Password'
                                className='input__signup password'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                placeholder='Confirm Password'
                                className='input__signup'
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            className='red__button signup__button'
                            type="submit"
                        >
                            Sign Up
                        </button>
                        <div className='align__right'>
                            <div className='signup__subtitle'>
                                Already on Whelp?
                                <Link className='switching' to='/login'>
                                    Log In
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};


export default SignupFormPage;
