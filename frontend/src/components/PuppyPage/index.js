import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, Redirect, useHistory, useParams } from 'react-router-dom';

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


    let thisPuppyImages = [];

    images.forEach(image => {
        if (puppyId == image.puppyId) {
            thisPuppyImages.push(image);
        }
    });

    useEffect(() => {
        dispatch(readImages());
        dispatch(readPuppies(litterId));
        dispatch(readLitter(litterId));
    }, [dispatch]);


    const removePuppy = async () => {
        await dispatch(deletePuppy(thisPuppy.id, litter.id));
        history.push(`/litter/${litter.id}`);
    };

    const removeImageOrPuppy = async (imageId) => {
        if (thisPuppyImages.length === 1) {
            await dispatch(deletePuppy(thisPuppy.id, litter.id));
            history.push(`/litter/${litter.id}`);
        } else {
            await dispatch(deleteImage(puppyId, imageId));
            history.push(`/litter/${litterId}/puppies/${puppyId}`);
        }
    };

    const addNewImage = () => {
        return (
            <div>

                <div className='each__puppy__container'>
                    <NavLink to={`/litter/${litter.id}/puppies/${thisPuppy.id}/add-image`} style={{ textDecoration: "none" }}>
                        <div className="find__your__place__photo">
                            <div className='photo__puppies add__puppy__button' >
                                +
                            </div>
                            <div className="add__puppy__title">
                                Add Image
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        )
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
                    <button className='button__litters all__buttons'>
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

                {litterOwner && <Link to={`/litter/${litterId}/puppies/${thisPuppy.id}/puppy-edit`}
                    className='edit__puppy__button '>
                    <button className='button__edit__litter button__litters'>
                        Edit Puppy
                    </button>
                </Link>}
                {litterOwner && <button
                    className='delete__puppy__button button__edit__litter button__litters'
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
                    {litterOwner && addNewImage()}
                    {thisPuppyImages.map(image =>
                        <li key={image.id} className='each__puppy__container' >

                            <div className="find__your__place__photo">
                                <div>
                                    <img className='photo__puppies' src={image.image} />
                                </div>
                                {litterOwner &&
                                    <div className='buttons__images__edit__del'>
                                        <Link to={`/litter/${litterId}/puppies/${puppyId}/images/${image.id}/edit-image`}>
                                            <button className='button__images all__buttons'>
                                                Replace Image
                                            </button>
                                        </Link>
                                        <button
                                            className='button__images all__buttons'
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
