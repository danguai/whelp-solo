const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');

const { Image } = require('../../db/models');

const router = express.Router();

//  C R E A T E   P U P P Y
// router.post('/', requireAuth, asyncHandler(async (req, res) => {
//     const {
//         image
//     } = req.body;

//     const puppyId = req.params;

//     console.log('ESTE ES EL PUPPY ID ===================+++++++++++++++++++====', puppyId);
//     const puppyImage = await Image.create(
//         {
//             image,
//             puppyId
//         });
//     return res.json({ puppyImage });
// }));

//   R E A D   O N E   I M A G E
router.get('/:imageId', asyncHandler(async (req, res) => {
    try {
        const id = +req.params.imageId;

        const image = await Image.findByPk(id);
        // console.log('INSIDE READ ONE - BE', oneImage.id);
        return res.json(image);
    } catch (e) {
        console.log('ERROR IN ONE IMAGE', e);
    }
}));

//   R E A D   I M A G E S
router.get('/', asyncHandler(async (req, res) => {
    try {

        const images = await Image.findAll();

        // console.log('images BE', images);
        return res.json(images);
    } catch (e) {
        console.log('READ IMAGES BACK END', e)
    }
}));


module.exports = router;
