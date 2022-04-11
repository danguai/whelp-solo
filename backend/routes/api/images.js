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

//  U P D A T E   I M A G E
router.put('/:imageId', requireAuth, asyncHandler(async (req, res) => {
    const id = req.params.imageId;

    // console.log('ID IN UPDATE: ', id);
    delete req.body.id;

    const [_updateCount, image] = await Image.update(req.body, {
        where: { id },
        returning: true,
        plain: true
    })

    return res.json(image);
}));

//   D E L E T E  I M A G E
router.delete('/:imageId', requireAuth, asyncHandler(async (req, res) => {
    const image = await Image.findByPk(req.params.imageId);

    if (!image) throw new Error(`Can't find image`);

    await Image.destroy({ where: { id: image.id } });

    return res.json({ id: image.id });
}));



module.exports = router;
