import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

// import { createLitter, updateLitter } from '../../store/litter';
import { createImage, updateImage } from '../../store/images';


const EditImageForm = () => {
    const { imageId, puppyId, litterId } = useParams();

    console.log('what is in here', useParams());

    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const litter = useSelector(state => state.litter?.litter);
    const puppies = useSelector(state => state.puppies.puppiesList);
    const images = useSelector(state => state.images.imagesList);

    // let thisPuppy = (puppies.filter(puppy => {
    //     if (puppyId == puppy.id) {
    //         return puppy;
    //     }
    // })[0]);

    let oldImage = (images.find(image => {
        return imageId == image.id;
    }));

    const [image, setImage] = useState(oldImage.image);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newImage = {
            image,
            puppyId
        };

        const createdImage = await dispatch(updateImage(oldImage, newImage));
        history.push(`/litter/${litterId}/puppies/${puppyId}`);
    };

    return (
        <div>
            <div className='puppy__form__container'>
                <div>
                    <img className='puppy__image' src={require('../../images/new_pup.png')} />
                </div>
                <div className='puppy__form__box'>
                    <div className='new__puppy__title'>
                        Replace Image
                    </div>
                    <form className='puppy__form' onSubmit={handleSubmit}>

                        <div className='puppy__form__area'>
                            <input
                                className='input__puppy'
                                placeholder='New Image'
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        <button type="submit">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
};


export default EditImageForm;
