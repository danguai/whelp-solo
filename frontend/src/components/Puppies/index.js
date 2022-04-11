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

    // let puppiesList = [];

    // puppies.forEach(puppy => {
    //     if (puppy.litterId === litter.id) {
    //         // console.log('EACH PUPPY: ', puppy);
    //         images.forEach(image => {
    //             if (puppy.id === image.puppyId) {
    //                 // console.log('EACH IMAGE: ', image)
    //                 const newPuppyObj = { ...puppy, ...image }
    //                 puppiesList.push(newPuppyObj);
    //             }
    //         });
    //     }
    // });

    let puppiesFromLitter = puppies.filter(puppy => {
        if (litter.id === puppy.litterId) {
            return true;
        }
    }).map(puppy => {
        const image = images.find(image => {
            return puppy.id === image.puppyId
        })
        return { ...image, ...puppy };
    })

    // console.log('PFL-------------', puppiesFromLitter);


    // let uniq
    const removePuppyOrLitter = (puppyId) => {
        if (puppiesFromLitter.length === 1) {
            dispatch(deleteLitter(litterId));
            history.push(`/`);
        } else {
            // puppiesFromLitter.forEach(puppy => {
            dispatch(deletePuppy(puppyId));
            history.push(`/litter/${litterId}`);
            // });
        }
    };

    const litterOwner = litter.userId === sessionUser?.id;



    return (

        <div id='all__litters'>
            <ul className='recent__litters'>
                {puppiesFromLitter.map(puppy =>
                    <li
                        key={puppy.id}
                        className='each__puppy__container'>
                        <NavLink to={`/litter/${litterId}/puppies/${puppy.id}`}>
                            <div className="find__your__place__photo">
                                <div>
                                    <img className='place__photo' src={puppy.image} />
                                </div>
                                <div className="puppy__title">
                                    {puppy.name}
                                </div>
                            </div>
                        </NavLink>
                        {litterOwner &&
                            <div>

                                {/* <button
                                // onClick={ }
                                >
                                    Edit Puppy
                                </button> */}
                                <button

                                    onClick={() => removePuppyOrLitter(puppy.id)}
                                >
                                    Delete Puppy
                                </button>
                            </div>}
                    </li>
                )}
            </ul>
        </div >

    )
};

export default Puppies;
