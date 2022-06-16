import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';

import { deleteLitter } from '../../store/litter';
import { readPuppies, deletePuppy } from '../../store/puppies';
import { readImages, updateImages } from '../../store/images';
// import * as sessionActions from '../../store/session';

import './Puppies.css';

const Puppies = () => {
    const { litterId, puppyId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const litter = useSelector(state => state.litter?.litter);
    const sessionUser = useSelector(state => state.session.user);

    const puppies = useSelector(state => state.puppies.puppiesList);

    const images = useSelector(state => state.images?.imagesList);


    useEffect(() => {
        dispatch(readPuppies());
        dispatch(readImages());
    }, [dispatch]);

    if (!puppies) return null;

    let puppiesFromLitter = puppies.filter(puppy => {
        if (litter.id === puppy.litterId) {
            return true;
        }
    }).map(puppy => {
        const image = images.find(image => {
            return puppy.id === image.puppyId;
        });
        return { ...image, ...puppy };
    });


    const removePuppyOrLitter = async (puppyId) => {
        if (puppiesFromLitter.length === 1) {
            await dispatch(deleteLitter(litterId));
            history.push(`/`);
        } else {
            await dispatch(deletePuppy(puppyId));
            history.push(`/litter/${litterId}`);
        }
    };

    const litterOwner = litter.userId === sessionUser?.id;

    return (

        <div id='all__puppies'>
            <ul className='recent__puppies'>
                {litterOwner &&
                    <div className='each__puppy__container'>
                        <NavLink to={`/litter/${litter.id}/new-puppy`} style={{ textDecoration: "none" }}>
                            <div className="find__your__place__photo">
                                <div className='place__photo__puppies add__puppy__button' >
                                    +
                                </div>
                                <div className="puppy__title">
                                    New Pup
                                </div>
                            </div>
                        </NavLink>
                    </div>}
                {puppiesFromLitter.map(puppy =>
                    <li
                        key={puppy.id}
                        className='each__puppy__container'>
                        <NavLink to={`/litter/${litterId}/puppies/${puppy.id}`} style={{ textDecoration: "none" }}>
                            <div className="find__your__place__photo">
                                <div>
                                    <img className='place__photo__puppies' src={puppy.image} />
                                </div>
                                <div className="puppy__title">
                                    {puppy.name}
                                </div>
                            </div>
                        </NavLink>
                        {/* {litterOwner &&
                            <div>

                                <button
                                    className='button__images all__buttons'
                                    onClick={() => removePuppyOrLitter(puppy.id)}
                                >
                                    Delete Puppy
                                </button>
                            </div>
                        } */}
                    </li>
                )}
            </ul>
        </div >

    )
};

export default Puppies;
