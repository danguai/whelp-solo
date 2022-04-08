const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');

const { Litter } = require('../../db/models');
const { Puppy } = require('../../db/models');
const { Image } = require('../../db/models');

const router = express.Router();

//  C R E A T E   L I T T E R
router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const { name,
        imageHeader,
        description,
        address,
        city,
        state,
        zipcode
    } = req.body;

    const userId = req.user.id;

    try {
        const litter = await Litter.create(
            {
                name,
                imageHeader,
                description,
                address,
                city,
                state,
                zipcode,
                userId
            });
        return res.json({ litter });
    } catch (e) {
        console.log(e);
    }
}));

//  R E A D   O N E   L I T T E R
router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const id = +req.params.id;
        const oneLitter = await Litter.findByPk(id);
        // console.log('INSIDE READ ONE - BE', oneLitter.id);
        return res.json(oneLitter);
    } catch (e) {
        console.log('ERROR IN ONE LITTER', e);
    }
}));

//  R E A D   A L L   L I T T E R
router.get('/', asyncHandler(async (_req, res) => {
    try {
        const allLitter = await Litter.findAll();
        // console.log('INSIDE READ ALL - BE', allLitter);
        return res.json(allLitter);
    } catch (e) {
        console.log('ERROR IN ALL LITTER', e);
    }
}));

//  U P D A T E   L I T T E R
router.put('/:id', requireAuth, asyncHandler(async (req, res) => {
    const id = req.body.id;
    delete req.body.id;

    await Litter.update(req.body, {
        where: { id },
        returning: true,
        plain: true
    });

    const litter = await Litter.findByPk(id);

    return res.json(litter);
}));

//  D E L E T E   L I T T E R
router.delete('/:id', asyncHandler(async (req, res) => {
    const litter = await Litter.findByPk(req.params.id);

    if (!litter) throw new Error('Can not find litter.');

    const puppies = await Puppy.findAll({});
    const images = await Image.findAll({});

    puppies.forEach(async puppy => {
        if (puppy.litterId === litter.id) {
            console.log(puppy.id);

            images.forEach(async image => {
                if (puppy.id === image.puppyId) {
                    await Image.destroy({ where: { puppyId: puppy.id } })
                }
            })
            await Puppy.destroy({ where: { id: puppy.id } })
        }
    });

    await Litter.destroy({ where: { id: litter.id } });

    return res.json({ id: litter.id });
}));


module.exports = router;
