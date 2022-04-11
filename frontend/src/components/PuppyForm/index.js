import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import {
    validatePuppyName,
    validatePuppyDescription,
    validateYear,
    validateMonth,
    validateDay
} from '../../utils/validation';

import { createPuppy } from '../../store/puppies';
import { createImage } from '../../store/images';
// import * as sessionActions from '../../store/session';

import './PuppyForm.css';

const PuppyForm = () => {
    const { litterId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    // const litterId = useSelector(state => state.litter?.litter.id)

    // console.log('SESSION USER', session);
    // console.log('LITTER ID', litterId);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [image, setImage] = useState('');

    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [dayError, setDayError] = useState('');
    const [monthError, setMonthError] = useState('');
    const [yearError, setYearError] = useState('');


    const checkingErrors = (
        nameError ||
        descriptionError ||
        dayError ||
        monthError ||
        yearError
    );

    if (!litterId) return null;

    let createdImage;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPuppy = {
            name,
            description,
            year,
            month,
            day,
            litterId
        };

        try {
            const createdPuppy = await dispatch(createPuppy(newPuppy));

            if (createdPuppy) {
                console.log('CREATED PUPPY: ', createdPuppy);

                const newImage = {
                    image,
                    puppyId: createdPuppy.id
                };

                console.log('NEW IMAGE: ', newImage);

                createdImage = await dispatch(createImage(newImage));
                console.log('CREATED IMAGE: ', createdImage);

                history.push(`/litter/${litterId}/puppies/${createdPuppy.id}`);
            }

        } catch (e) {
            console.log('IS IT HERE?', e);
        }
    };


    return (
        <div>
            <div className='puppy__form__container'>
                <div>
                    <img className='puppy__image' src={require('../../images/new_pup.png')} />
                </div>
                <div className='puppy__form__box'>
                    <div className='new__puppy__title'>
                        New puppy
                    </div>
                    <form className='puppy__form' onSubmit={handleSubmit}>
                        <div>
                            <input
                                className='input__puppy'
                                placeholder='Name'
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => {
                                    const error = validatePuppyName(name)
                                    if (error) setNameError(error)
                                }}
                                onFocus={() => { setNameError('') }}
                                required
                            />
                        </div>
                        {nameError && <div className="errors_style">{nameError}</div>}
                        <div>
                            <textarea
                                className='input__puppy'
                                placeholder='Description'
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                onBlur={() => {
                                    const error = validatePuppyDescription(description)
                                    if (error) setDescriptionError(error)
                                }}
                                onFocus={() => { setDescriptionError('') }}
                                required
                            />
                        </div>
                        {descriptionError && <div className="errors_style">{descriptionError}</div>}
                        <div>
                            <input
                                className='input__puppy'
                                placeholder='Month'
                                type="number"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                onBlur={() => {
                                    const error = validateMonth(month)
                                    if (error) setMonthError(error)
                                }}
                                onFocus={() => { setMonthError('') }}
                                required
                            />
                        </div>
                        {monthError && <div className="errors_style">{monthError}</div>}
                        <div className='puppy__form__area'>
                            <input
                                className='input__puppy'
                                placeholder='Day'
                                type="number"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                onBlur={() => {
                                    const error = validateDay(day)
                                    if (error) setDayError(error)
                                }}
                                onFocus={() => { setDayError('') }}
                                required
                            />
                        </div>
                        {dayError && <div className="errors_style">{dayError}</div>}
                        <div className='puppy__form__area'>
                            <input
                                className='input__puppy'
                                placeholder='Year'
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                onBlur={() => {
                                    const error = validateYear(year)
                                    if (error) setYearError(error)
                                }}
                                onFocus={() => { setYearError('') }}
                                required
                            />
                        </div>
                        {yearError && <div className="errors_style">{yearError}</div>}
                        <div className='puppy__form__area'>
                            <input
                                className='input__puppy'
                                placeholder='First Image'
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            // onBlur={() => {
                            //     const error = validateYear(year)
                            //     if (error) setYearError(error)
                            // }}
                            // onFocus={() => { setYearError('') }}
                            // required
                            />
                        </div>
                        {/* {yearError && <div className="errors_style">{yearError}</div>} */}

                        <button
                            className={checkingErrors ? 'red__button__disabled puppy__button all__buttons' : 'red__button puppy__button all__buttons'}
                            disabled={checkingErrors}
                            type="submit"
                        >
                            New Puppy
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
};


export default PuppyForm;
