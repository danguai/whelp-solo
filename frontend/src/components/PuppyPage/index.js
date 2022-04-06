import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import { readLitter, deleteLitter } from '../../store/litter';
import { readPuppy, deletePuppy } from '../../store/puppies';

import Puppies from '../Puppies';
// import * as sessionActions from '../../store/session';

import './PuppyPage.css';

const PuppyPage = () => {
    const { litterId, puppyId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [active, setActive] = useState('false');

    const litter = useSelector(state => state.litter?.litter);
    const sessionUser = useSelector(state => state.session.user);
    const puppies = useSelector(state => state.puppies.puppiesList);

    console.log('PUPPY ID', puppyId);

    // console.log('litter', litter);

    let thisPuppy = puppies.filter(puppy => {
        if (puppyId == puppy.id) {
            return puppy;
        }
    });

    console.log('THIS PUPPY', thisPuppy);

    useEffect(() => {
        dispatch(readLitter(litterId));
    }, [dispatch]);

    // const handleToggle = () => {
    //     setActive(!active);
    // };

    const removePuppy = () => {
        dispatch(deletePuppy(thisPuppy.id));
        history.push('/');
    };

    // if (!litter) return null;

    const litterOwner = litter.userId === sessionUser?.id;

    // const puppy

    // const canWriteReview = sessionUser && !litterOwner;

    return (
        <div>
            <div className='puppy__name'>
                {thisPuppy[0].name}
            </div>
            <div className='paws__score'>

            </div>
            <div>
                {/* {litterOwner && <Link to={`/${puppy.id}/puppy-edit`}
                    className='edit__puppy__button'>
                    <button>
                        Edit Puppy
                    </button>
                </Link>} */}
                {litterOwner && <button
                    className='delete__puppy__button'
                    onClick={removePuppy}
                    type='submit'
                >
                    Delete Puppy
                </button>}

            </div>


        </div>
    )
};

export default PuppyPage;
