import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import { readPuppy, deletePuppy } from '../../store/puppies';
import { readImages } from '../../store/images';

import Puppies from '../Puppies';
// import * as sessionActions from '../../store/session';

import './PuppyPage.css';

const PuppyPage = () => {
    const { litterId, puppyId } = useParams();

    console.log(puppyId);
    const dispatch = useDispatch();
    const history = useHistory();

    const [active, setActive] = useState('false');

    const litter = useSelector(state => state.litter?.litter);
    const sessionUser = useSelector(state => state.session.user);
    const puppies = useSelector(state => state.puppies.puppiesList);
    const images = useSelector(state => state.images);


    console.log('IMAGES', images);


    let thisPuppy = (puppies.filter(puppy => {
        if (puppyId == puppy.id) {
            return puppy;
        }
    })[0]);

    // useEffect(() => {
    //     dispatch(readPuppy(puppyId));
    // }, [dispatch]);

    // const handleToggle = () => {
    //     setActive(!active);
    // };

    const removePuppy = () => {
        dispatch(deletePuppy(thisPuppy.id));
        history.push(`/litter/${litter.id}`);
    };

    const newDate = new Date().toJSON().slice(0, 10).split('-');

    const age = newDate[0] - thisPuppy.year;


    const litterOwner = litter.userId === sessionUser?.id;

    // const puppy

    // const canWriteReview = sessionUser && !litterOwner;

    return (
        <div>
            <div>
                <Link to={`/litter/${litter.id}`}
                    className='back__to__litter__button'>
                    <button>
                        Back to Litter
                    </button>
                </Link>
            </div>
            <div className='puppy__name'>
                {thisPuppy.name}
            </div>
            <div className='puppy__age'>
                {`Age: ${age}`}
            </div>
            <div className='puppy__description'>
                {thisPuppy.description}
            </div>
            <div className='puppy__birthday'>
                {`Date of Birth: ${thisPuppy.month} / ${thisPuppy.day} / ${thisPuppy.year}`}
            </div>

            <div className='paws__score'>

            </div>
            <div>
                {litterOwner && <Link to={`/puppies/${thisPuppy.id}/puppy-edit`}
                    className='edit__puppy__button'>
                    <button>
                        Edit Puppy
                    </button>
                </Link>}
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
