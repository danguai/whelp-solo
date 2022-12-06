import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import { createImage } from '../../store/images';

const AddImageForm = () => {
    const { puppyId, litterId } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    // const sessionUser = useSelector(state => state.session.user);
    // const litter = useSelector(state => state.litter?.litter);
    const puppies = useSelector(state => state.puppies.puppiesList);
    // const images = useSelector(state => state.images.imagesList);

    let thisPuppy = (puppies.filter(puppy => puppyId == puppy.id)[0]);

    const [image, setImage] = useState('');
    const [visible, setVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newImage = {
            image,
            puppyId
        };

        await dispatch(createImage(newImage));
        history.push(`/litter/${litterId}/puppies/${thisPuppy.id}`);
    };

    const openImageManager = () => setVisible(true);
    const closeImageManager = () => setVisible(false);

    const handleFiles = async e => {
        const files = e.target.files;
        if (files.length === 0) return;

        const file = files[0];
        const signedResponse = await fetch(`/api/image/aws?file-name=${file.name}&file-type=${file.type}`);

        if (signedResponse.ok) {
            const signedResponseJson = await signedResponse.json();
            const uploadResponse = await fetch(signedResponseJson.signedRequest, {
                method: 'PUT',
                body: file
            });

            if (uploadResponse.ok) {
                setImage(signedResponseJson.url);
            }
        }
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
                                type="hidden"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        <div className="images-modal">
                            <div className="images-modal-background" onClick={closeImageManager} />
                            <div className="images-modal-content">
                                <div className="images-modal-list">
                                    {/* {images && Object.values(images).map((img, i) => (
                                        <div key={i} className="image-manager-image">
                                            <i className="fa-solid fa-xmark-large" onClick={deleteHandler(img.id, img.puppyId)} />
                                            <div className='img-thumbnail' style={{ backgroundImage: `url(${img.url})` }} />
                                            {img.url.slice(47)}
                                        </div>
                                    ))} */}
                                </div>
                                <input type="file" id="img-input" name="img-input" multiple accept=".png,.jpg,.jpeg" onChange={handleFiles} />
                                <label htmlFor="img-input"></label>
                            </div>
                        </div>
                        <button
                            onClick={openImageManager}
                            type="submit">
                            Add Image
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
};


export default AddImageForm;
