import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';

import { readPuppies } from '../../store/puppies';
import { readImages } from '../../store/images';
// import * as sessionActions from '../../store/session';

import './Puppies.css';

const Puppies = () => {
    const dispatch = useDispatch();

    const litter = useSelector(state => state.litter?.litter)
    const puppies = useSelector(state => state.puppies.puppiesList);

    const images = useSelector(state => state.images?.imagesList);


    let puppiesList = [];
    let puppiesImagesList = [];

    puppies.forEach(puppy => {
        if (puppy.litterId === litter.id) {
            images.forEach(image => {
                if (puppy.id === image.puppyId) {
                    puppiesImagesList.push(image);
                }
            });
            puppiesList.push(puppy);
        }
    });

    const imageForPuppy = () => {
        puppies.forEach(puppy => {
            if (puppy.litterId === litter.id) {
                images.forEach(image => {
                    if (puppy.id === image.puppyId) {
                        puppiesImagesList.push(image);
                    }
                });
                puppiesList.push(puppy);
            }
        });

    }

    console.log('puppiesList', puppiesList);
    console.log('puppiesImagesList', puppiesImagesList);

    useEffect(() => {
        dispatch(readPuppies());
        dispatch(readImages());
    }, [dispatch]);



    if (!puppies) return null;

    return (

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

    )
};

export default Puppies;
