import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';

import { readPuppies } from '../../store/puppies';
// import * as sessionActions from '../../store/session';

import './Puppies.css';

const Puppies = () => {
    const dispatch = useDispatch();

    const litter = useSelector(state => state.litter?.litter)
    const puppies = useSelector(state => state.puppies.puppiesList);

    let puppiesList = [];

    puppies.forEach(puppy => {
        if (puppy.litterId === litter.id) {
            puppiesList.push(puppy);
        }
    });

    useEffect(() => {
        dispatch(readPuppies());
    }, [dispatch]);

    if (!puppies) return null;

    return (
        <div className='login__form__container'>


            <div id='all__litters'>
                <ul className='recent__litters'>
                    {puppiesList.map(puppy =>
                        <li
                            key={puppy.id}
                            className='each__puppy__container'>
                            <NavLink to={`/puppies/${puppy.id}`}>
                                <div className="find__your__place__photo">
                                    <div>
                                        <img className='place__photo' src={require('../../images/puppy-temp.png')} />
                                    </div>
                                    <div className="puppy__title">
                                        {puppy.name}
                                    </div>
                                </div>
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
};

export default Puppies;
