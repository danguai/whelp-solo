const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');

const { Image } = require('../../db/models');

const router = express.Router();

//  C R E A T E   I M A G E
router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const { image, puppyId } = req.body;

    const puppyImage = await Image.create(
        {
            image,
            puppyId
        });

    return res.json(puppyImage);
}));

//   R E A D   I M A G E S
router.get('/', asyncHandler(async (req, res) => {
    try {
        const images = await Image.findAll();

        return res.json(images);
    } catch (e) {
        console.log('READ IMAGES BACK END', e)
    }
}));


module.exports = router;
