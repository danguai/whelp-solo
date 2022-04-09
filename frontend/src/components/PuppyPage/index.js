import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import { readPuppy, deletePuppy } from '../../store/puppies';
import { readImages, deleteImage } from '../../store/images';

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
    const images = useSelector(state => state.images?.imagesList);

    let thisPuppy = (puppies.filter(puppy => {
        if (puppyId == puppy.id) {
            return puppy;
        }
    })[0]);

    let thisPuppyImages = (images.filter(image => {
        if (puppyId == image.puppyId) {
            return image;
        }
    }));

    // console.log('WHAT HAPPEN', thisPuppyImages);

    useEffect(() => {
        dispatch(readImages());
    }, [dispatch]);

    // const handleToggle = () => {
    //     setActive(!active);
    // };

    const removePuppy = () => {
        dispatch(deletePuppy(thisPuppy.id, litter.id));
        history.push(`/litter/${litter.id}`);
    };

    const removeImage = () => {
        // dispatch(deleteImage(thisPuppy.id, image.id));
        history.push(`/puppies/${puppyId}`);
    };

    if (!thisPuppy) return null;

    const newDate = new Date().toJSON().slice(0, 10).split('-');
    const age = newDate[0] - thisPuppy.year;

    const litterOwner = litter.userId === sessionUser?.id;

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
            <div className='gradient'>
                {thisPuppyImages[0].image ?
                    <img className='litter__bg__image' src={thisPuppyImages[0].image}
                    /> :
                    <img className='litter__bg__image' src={require('../../images/puppy-temp.png')}
                    />
                }
            </div>
            <div id='all__litters'>
                <ul className='recent__litters'>
                    {thisPuppyImages.map(puppy =>
                        <li key={puppy.id} className='each__puppy__container' >

                            <div className="find__your__place__photo">
                                <div>
                                    <img className='place__photo' src={puppy.image} />
                                </div>
                                <div>
                                    <button
                                        onClick={removeImage}>
                                        Delete Image
                                    </button>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>

        </div >
    )
};

export default PuppyPage;
