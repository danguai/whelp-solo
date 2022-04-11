import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import { readLitter } from '../../store/litter';
import { readPuppies, updatePuppy, deletePuppy } from '../../store/puppies';
import { readImages, deleteImage } from '../../store/images';

import Puppies from '../Puppies';
// import * as sessionActions from '../../store/session';

import './PuppyPage.css';

const PuppyPage = () => {
    const { puppyId, litterId } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    const [active, setActive] = useState('false');

    const litter = useSelector(state => state.litter?.litter);
    const sessionUser = useSelector(state => state.session.user);
    const puppies = useSelector(state => state.puppies?.puppiesList);
    const images = useSelector(state => state.images?.imagesList);

    let thisPuppy = (puppies.filter(puppy => {
        if (puppyId == puppy.id) {
            return puppy;
        }
    })[0]);

    // console.log('THIS PUPPY', thisPuppy);
    // console.log('ALL IMAGES', images);

    let thisPuppyImages = [];

    images.forEach(image => {
        if (puppyId == image.puppyId) {
            thisPuppyImages.push(image);
        }
    });

    // console.log('THIS PUPPY IMAGES', thisPuppyImages[0]);
    // console.log('THIS PUPPY IMAGES ID', thisPuppyImages[0].id);
    // console.log('THIS PUPPY IMAGES IMAGE', thisPuppyImages[0].image);

    useEffect(() => {
        dispatch(readImages());
        dispatch(readPuppies(litterId));
        dispatch(readLitter(litterId));
    }, [dispatch]);

    // const handleToggle = () => {
    //     setActive(!active);
    // };

    const removePuppy = () => {
        dispatch(deletePuppy(thisPuppy.id, litter.id));
        history.push(`/litter/${litter.id}`);
    };

    // const removeImage = () => {
    //     // dispatch(deleteImage(thisPuppy.id, image.id));
    //     history.push(`/puppies/${puppyId}`);
    // };

    const removeImageOrPuppy = (imageId) => {
        if (thisPuppyImages.length === 1) {
            dispatch(deletePuppy(thisPuppy.id, litter.id));
            history.push(`/litter/${litter.id}`);
        } else {
            dispatch(deleteImage(puppyId, imageId));
            history.push(`/litter/${litterId}/puppies/${puppyId}`);
        }
    }

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
                {litterOwner && <Link to={`/litter/${litterId}/puppies/${thisPuppy.id}/add-image`}
                    className='add__image__button'>
                    <button>
                        Add Image
                    </button>
                </Link>}
                {litterOwner && <Link to={`/litter/${litterId}/puppies/${thisPuppy.id}/puppy-edit`}
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
            <div id='all__litter'>
                <ul className='this__puppy__photos'>
                    {thisPuppyImages.map(image =>
                        <li key={image.id} className='each__puppy__container' >

                            <div className="find__your__place__photo">
                                <div>
                                    <img className='place__photo' src={image.image} />
                                </div>
                                {litterOwner &&
                                    <div>
                                        <Link to={`/litter/${litterId}/puppies/${puppyId}/images/${image.id}/edit-image`}>
                                            <button>
                                                Replace Image
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => removeImageOrPuppy(image.id)}>
                                            Delete Image
                                        </button>
                                    </div>
                                }
                            </div>
                        </li>
                    )}
                </ul>
            </div>

        </div >
    )
};

export default PuppyPage;
