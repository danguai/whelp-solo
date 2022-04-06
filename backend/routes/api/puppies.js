const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');

const { Puppy } = require('../../db/models');


const router = express.Router({ mergeParams: true });


//  C R E A T E   P U P P Y
router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const {
        name,
        description,
        year,
        month,
        day,
    } = req.body;

    const userId = req.user.id;
    const litterId = req.params.litterId;

    const puppy = await Puppy.create(
        {
            name,
            description,
            year,
            month,
            day,
            userId,
            litterId
        });

    return res.json({ puppy });

}));

//   R E A D   P U P P Y
router.get('/:puppyId', requireAuth, asyncHandler(async (req, res) => {
    try {
        const id = +req.params.id;
        const puppy = await Puppy.findByPk(id);
        return res.json(puppy);
    } catch {
        console.log('ERROR READING ONE PUPPY', e);
    }
}));

//   R E A D   P U P P I E S
router.get('/', requireAuth, asyncHandler(async (req, res) => {
    try {
        const puppies = await Puppy.findAll();
        return res.json(puppies);
    } catch {
        console.log('ERROR READING ALL PUPPIES', e);
    }
}));

//  U P D A T E   P U P P Y
router.put('/:puppyId', requireAuth, asyncHandler(async (req, res) => {
    const id = req.params.puppyId;

    delete req.body.id;

    const [_updateCount, puppy] = await Puppy.update(req.body, {
        where: { id },
        returning: true,
        plain: true
    })

    return res.json(puppy);
}));

//   D E L E T E  P U P P Y
router.delete('/:puppyId', asyncHandler(async (req, res) => {
    const puppy = await Puppy.findByPk(req.params.puppyId);

    console.log('PUPPY iN DELETE', puppy);

    if (!puppy) throw new Error(`Can't find puppy`);

    await Puppy.destroy({ where: { id: puppy.id } });

    return res.json({ id: puppy.id });
}));

module.exports = router;
