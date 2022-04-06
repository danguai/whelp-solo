const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');

const { Image } = require('../../db/models');


const router = express.Router({ mergeParams: true });


//  C R E A T E   I M A G E
// router.post('/', requireAuth, asyncHandler(async (req, res) => {

// }));

//   R E A D   I M A G E S
// router.get('/', requireAuth, asyncHandler(async (req, res) => {
//     try {
//         const images = await Image.findAll();
//         return res.json(images);
//     } catch {
//         console.log('ERROR READING ALL IMAGES', e);
//     }
// }));
