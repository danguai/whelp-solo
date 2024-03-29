import { csrfFetch } from './csrf';

//  C O N S T A N T S

const CREATE_IMAGE = 'images/CREATE_IMAGE';
const READ_IMAGES = 'images/READ_IMAGES';
const UPDATE_IMAGE = 'images/UPDATE_IMAGE';
const DELETE_IMAGE = 'images/DELETE_IMAGE';


//  A C T I O N S
const createImageAction = ({ image, puppyId, url }) => {
    return {
        type: CREATE_IMAGE,
        image,
        puppyId,
        url
    };
};

const readImagesAction = images => {
    return {
        type: READ_IMAGES,
        arrOfImages: images
    };
};

const updateImageAction = (image, url) => {
    return {
        type: UPDATE_IMAGE,
        payload: image,
        url
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
export const createImage = ({ image, puppyId, url }) => async dispatch => {
    const response = await csrfFetch(`/api/images`, {
        method: 'POST',
        body: JSON.stringify({ image, puppyId, url })
    });

    const data = await response.json();
    if (response.ok) {
        dispatch(createImageAction({ image, puppyId, url }));
        return data.image;
    } else {
        console.log(data.errors);
    }
};

//  R E A D   A L L   I M A G E S   T H U N K
export const readImages = () => async dispatch => {
    const response = await csrfFetch(`/api/images`);

    if (response.ok) {
        const resJson = await response.json();
        dispatch(readImagesAction(resJson));
        return resJson;
    }
};

//  U P D A T E   I M A G E
export const updateImage = (oldImage, newImage, url) => async dispatch => {
    const { puppyId, id, url } = oldImage;
    const response = await csrfFetch(`/api/images/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newImage)
    });

    const data = await response.json();

    if (response.ok) {
        dispatch(updateImageAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

//  D E L E T E   I M A G E   T H U N K
export const deleteImage = imageId => async dispatch => {
    const response = await csrfFetch(`/api/images/${imageId}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (response) {
        dispatch(deleteImageAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};


//  R E D U C E R S
const initialState = { imagesList: [] };

const imagesReducer = (state = initialState, action) => {
    let newState;

    const { payload, image, puppyId, url, type, arrOfImages } = action;

    switch (type) {
        case CREATE_IMAGE:
            newState = Object.assign({}, state);
            newState.imagesList.push({ image, puppyId, url });
            return newState;
        case READ_IMAGES:
            newState = Object.assign({}, state);
            newState.imagesList = arrOfImages;
            return newState;
        case UPDATE_IMAGE:
            newState = Object.assign({}, state);
            const imageIndex = newState.imagesList.findIndex(img => img.id === payload.id);
            newState.imagesList[imageIndex] = payload;
            return newState;
        case DELETE_IMAGE:
            newState = Object.assign({}, state);
            newState.imagesList = newState
                .imagesList
                .filter(image => payload.id !== image.id);
            return newState;
        default:
            return state;
    }
};


export default imagesReducer;
