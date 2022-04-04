const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');

const { Litter } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//  C R E A T E   L I T T E R
router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const { name,
        imageHeader,
        description,
        address
    } = req.body;

    const userId = req.user.id;

    try {
        const litter = await Litter.create(
            {
                name,
                imageHeader,
                description,
                address,
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
        // console.log('INSIDE READ ONE - BE', oneLitter);
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


module.exports = router;
