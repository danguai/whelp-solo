import { csrfFetch } from './csrf';

//  C O N S T A N T S

const CREATE_IMAGE = 'images/CREATE_IMAGE';
const READ_IMAGES = 'images/READ_IMAGES';
const UPDATE_IMAGE = 'images/UPDATE_IMAGE';
const DELETE_IMAGE = 'images/DELETE_IMAGE';


//  A C T I O N S
const createImageAction = image => {
    return {
        type: CREATE_IMAGE,
        payload: image
    };
};

const readImagesAction = images => {
    return {
        type: READ_IMAGES,
        arrOfImages: images
    };
};

const deleteImageAction = image => {
    return {
        type: DELETE_IMAGE,
        payload: image
    };
};

//  T H U N K S
//  C R E A T E   I M A G E   T H U N K
export const createImage = imageTest => async dispatch => {
    const { image, puppyId } = imageTest;
    try {
        const response = await csrfFetch(`/api/puppies/${puppyId}/images`, {
            method: 'POST',
            body: JSON.stringify({ image, puppyId })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.errors) {
                return Promise.reject(data);
            }
            dispatch(createImageAction(data.image));
            return data.image;
        }
    } catch (e) {
        console.log('CREATE IMAGE ERROR', e);
    }
    return Promise.reject();
};

//  R E A D   A L L   I M A G E S   T H U N K
export const readImages = puppyId => async dispatch => {
    const response = await csrfFetch(`/api/puppies/${puppyId}/images`);

    if (response.ok) {
        const resJson = await response.json();
        dispatch(readImagesAction(resJson));
        return resJson;
    }
};

//  D E L E T E   I M A G E   T H U N K
export const deleteImage = (puppyId, imageId) => async dispatch => {
    const response = await csrfFetch(`/api/puppies/${puppyId}/images/${imageId}`, {
        method: 'DELETE'
    });

    if (response) {
        const resJson = await response.json();
        dispatch(deleteImageAction({ id: imageId }));
        return resJson;
    }
};


//  R E D U C E R S
const initialState = { imagesList: [] };

const imagesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_IMAGE:
            newState = Object.assign({}, state);
            newState.image = action.payload;
            return newState;
        case READ_IMAGES:
            newState = Object.assign({}, state);
            newState.imagesList = action.arrOfImages;
            return newState;
        case DELETE_IMAGE:
            newState = Object.assign({}, action);
            newState.imagesList = newState
                .imagesList
                .filter(image => action.payload.id !== image.id);
            return newState;
        default:
            return state;
    }
};


export default imagesReducer;
