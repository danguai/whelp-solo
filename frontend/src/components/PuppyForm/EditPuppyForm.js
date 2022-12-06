import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import {
    validatePuppyName,
    validatePuppyDescription,
    validateYear,
    validateMonth,
    validateDay
} from '../../utils/validation';

import { updatePuppy } from '../../store/puppies';
import { updateImage } from '../../store/images';

import './PuppyForm.css';

const EditPuppyForm = () => {
    const { puppyId, litterId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const litter = useSelector(state => state.litter?.litter);

    const puppies = useSelector(state => state.puppies?.puppiesList);
    const images = useSelector(state => state.images?.imagesList);

    let thisPuppy = puppies.filter(puppy => puppyId == puppy?.id)[0];
    let firstImage = images.find(image => puppyId == image?.puppyId);

    const [name, setName] = useState(thisPuppy?.name);
    const [description, setDescription] = useState(thisPuppy?.description);
    const [day, setDay] = useState(thisPuppy?.day);
    const [month, setMonth] = useState(thisPuppy?.month);
    const [year, setYear] = useState(thisPuppy?.year);

    const [image, setImage] = useState(firstImage?.image);

    const [visible, setVisible] = useState(false);

    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [dayError, setDayError] = useState('');
    const [monthError, setMonthError] = useState('');
    const [yearError, setYearError] = useState('');


    const checkingErrors = (
        nameError ||
        descriptionError ||
        dayError ||
        monthError ||
        yearError
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedPuppy = {
            ...thisPuppy,
            name,
            description,
            year,
            month,
            day,
            // litterId
        };


        try {
            const updatedPuppy = await dispatch(updatePuppy(editedPuppy));
            history.push(`/litter/${litterId}/puppies/${updatedPuppy.id}`);

            if (updatedPuppy) {
                let updatedImage = {
                    ...firstImage,
                    image
                };

                updatedImage = await dispatch(updateImage(firstImage, updatedImage));
                history.push(`/litter/${litterId}/puppies/${updatedImage.puppyId}`);
            }
        } catch (e) {
            console.log('OHHHHH NOOOOOOOOOO!O!!!!!!', e);
        }
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

    // if (!litterId) return null;

    return (
        <div>
            <div className='puppy__form__container'>
                <div>
                    <img className='puppy__image' src={require('../../images/new_pup.png')} />
                </div>
                <div className='puppy__form__box'>
                    <div className='new__puppy__title'>
                        Edit puppy
                    </div>
                    <form className='puppy__form' onSubmit={handleSubmit}>
                        <div>
                            <input
                                className='input__puppy'
                                placeholder='Name'
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => {
                                    const error = validatePuppyName(name)
                                    if (error) setNameError(error)
                                }}
                                onFocus={() => { setNameError('') }}
                                required
                            />
                        </div>
                        {nameError && <div className="errors_style">{nameError}</div>}
                        <div>
                            <textarea
                                className='input__puppy'
                                placeholder='Description'
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                onBlur={() => {
                                    const error = validatePuppyDescription(description)
                                    if (error) setDescriptionError(error)
                                }}
                                onFocus={() => { setDescriptionError('') }}
                                required
                            />
                        </div>
                        {descriptionError && <div className="errors_style">{descriptionError}</div>}
                        <div>
                            <input
                                className='input__puppy'
                                placeholder='Month'
                                type="number"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                onBlur={() => {
                                    const error = validateMonth(month)
                                    if (error) setMonthError(error)
                                }}
                                onFocus={() => { setMonthError('') }}
                                required
                            />
                        </div>
                        {monthError && <div className="errors_style">{monthError}</div>}
                        <div className='puppy__form__area'>
                            <input
                                className='input__puppy'
                                placeholder='Day'
                                type="number"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                onBlur={() => {
                                    const error = validateDay(day)
                                    if (error) setDayError(error)
                                }}
                                onFocus={() => { setDayError('') }}
                                required
                            />
                        </div>
                        {dayError && <div className="errors_style">{dayError}</div>}
                        <div className='puppy__form__area'>
                            <input
                                className='input__puppy'
                                placeholder='Year'
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                onBlur={() => {
                                    const error = validateYear(year)
                                    if (error) setYearError(error)
                                }}
                                onFocus={() => { setYearError('') }}
                                required
                            />
                        </div>
                        {yearError && <div className="errors_style">{yearError}</div>}
                        <div className='puppy__form__area'>
                            <input
                                type="text"
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
                            className={checkingErrors ? 'red__button__disabled puppy__button all__buttons' : 'red__button puppy__button all__buttons'}
                            disabled={checkingErrors}
                            type="submit"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
};


export default EditPuppyForm;
