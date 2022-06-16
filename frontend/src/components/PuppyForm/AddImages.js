import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

// import { createLitter, updateLitter } from '../../store/litter';
import { createImage } from '../../store/images';


const AddImageForm = () => {
    const { puppyId, litterId } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const litter = useSelector(state => state.litter?.litter);
    const puppies = useSelector(state => state.puppies.puppiesList);
    const images = useSelector(state => state.images.imagesList);

    let thisPuppy = (puppies.filter(puppy => {
        if (puppyId == puppy.id) {
            return puppy;
        }
    })[0]);

    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newImage = {
            image,
            puppyId
        };

        const createdImage = await dispatch(createImage(newImage));
        history.push(`/litter/${litterId}/puppies/${thisPuppy.id}`);
    };

    return (
        <div>
            <div className='puppy__form__container'>
                <div>
                    <img className='puppy__image' src={require('../../images/new_pup.png')} />
                </div>
                <div className='puppy__form__box'>
                    <div className='new__puppy__title'>
                        Add New Image
                    </div>
                    <form className='puppy__form' onSubmit={handleSubmit}>

                        <div className='puppy__form__area'>
                            <input
                                className='input__puppy'
                                placeholder='New Image'
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
                        <button type="submit">
                            Add Image
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
};


export default AddImageForm;
