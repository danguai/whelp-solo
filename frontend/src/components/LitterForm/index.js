import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import {
    validateLitterName,
    validateLitterDescription,
    validateImageHeader,
    validateAddress,
    validateCity,
    validateState,
    validateZipcode
} from '../../utils/validation';

import { createLitter, updateLitter } from '../../store/litter';
// import * as sessionActions from '../../store/session';

import './LitterForm.css';

const LitterForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const litter = useSelector(state => state.litter?.litter);

    const [name, setName] = useState('');
    const [imageHeader, setImageHeader] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');

    const [nameError, setNameError] = useState('');
    const [imageHeaderError, setImageHeaderError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [cityError, setCityError] = useState('');
    const [stateError, setStateError] = useState('');
    const [zipcodeError, setZipcodeError] = useState('');

    const checkingErrors = (
        nameError ||
        imageHeaderError ||
        descriptionError ||
        addressError ||
        cityError ||
        stateError ||
        zipcodeError
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newLitter = {
            name,
            imageHeader,
            description,
            address,
            city,
            state,
            zipcode
        };

        const createdLitter = await dispatch(createLitter(newLitter));
        history.push(`/litter/${createdLitter.id}`);
    };

    return (
        <div>
            <div className='litter__form__container'>
                <div>
                    <img className='litter__image' src={require('../../images/new_litter_pups.png')} />
                </div>
                <div className='litter__form__box'>
                    <div className='new__litter__title'>
                        New Litter
                    </div>
                    <form className='litter__form' onSubmit={handleSubmit}>
                        <div>
                            <input
                                className='input__litter'
                                placeholder='Name'
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => {
                                    const error = validateLitterName(name)
                                    if (error) setNameError(error)
                                }}
                                onFocus={() => { setNameError('') }}
                                required
                            />
                        </div>
                        {nameError && <div className="errors_style">{nameError}</div>}
                        <div>
                            <input
                                className='input__litter'
                                placeholder='Image'
                                type="text"
                                value={imageHeader}
                                onChange={(e) => setImageHeader(e.target.value)}
                                onBlur={() => {
                                    const error = validateImageHeader(imageHeader)
                                    if (error) setImageHeaderError(error)
                                }}
                                onFocus={() => { setImageHeaderError('') }}
                                required
                            />
                        </div>
                        {imageHeaderError && <div className="errors_style">{imageHeaderError}</div>}
                        <div className='litter__form__area'>
                            <textarea
                                className='input__litter'
                                placeholder='Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                onBlur={() => {
                                    const error = validateLitterDescription(description)
                                    if (error) setDescriptionError(error)
                                }}
                                onFocus={() => { setDescriptionError('') }}
                                required
                            />
                        </div>
                        {descriptionError && <div className="errors_style">{descriptionError}</div>}
                        <div>
                            <input
                                className='input__litter'
                                placeholder='Address'
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                onBlur={() => {
                                    const error = validateAddress(address)
                                    if (error) setAddressError(error)
                                }}
                                onFocus={() => { setAddressError('') }}
                                required
                            />
                        </div>
                        {addressError && <div className="errors_style">{addressError}</div>}
                        <div>
                            <input
                                className='input__litter'
                                placeholder='City'
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                onBlur={() => {
                                    const error = validateCity(city)
                                    if (error) setCityError(error)
                                }}
                                onFocus={() => { setCityError('') }}
                                required
                            />
                        </div>
                        {cityError && <div className="errors_style">{cityError}</div>}
                        <div>
                            <input
                                className='input__litter'
                                placeholder='State'
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                onBlur={() => {
                                    const error = validateState(state)
                                    if (error) setStateError(error)
                                }}
                                onFocus={() => { setStateError('') }}
                                required
                            />
                        </div>
                        {stateError && <div className="errors_style">{stateError}</div>}
                        <div>
                            <input
                                className='input__litter'
                                placeholder='Zipcode'
                                type="text"
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                                onBlur={() => {
                                    const error = validateZipcode(zipcode)
                                    if (error) setZipcodeError(error)
                                }}
                                onFocus={() => { setZipcodeError('') }}
                                required
                            />
                        </div>
                        {zipcodeError && <div className="errors_style">{zipcodeError}</div>}
                        <button
                            className={checkingErrors ? 'red__button__disabled litter__button all__buttons' : 'red__button litter__button all__buttons'}
                            disabled={checkingErrors}
                            type="submit"
                        >
                            New Litter
                        </button>
                    </form>

                </div>
            </div>

        </div >
    )
};

export default LitterForm;
