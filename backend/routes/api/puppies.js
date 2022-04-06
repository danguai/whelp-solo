const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');

const { Puppy } = require('../../db/models');
const { Image } = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router({ mergeParams: true });

//  L I T T E R   V A L I D A T O R
const validatePuppy = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage("Puppy's Name should not be longer than 50 characters"),
    check('year')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Year must be a number')
        .isLength({ max: 4 })
        .withMessage('Year should not be more than 4 numbers'),
    check('month')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Month must be a number')
        .isLength({ max: 2 })
        .withMessage('Month should not be more than 2 numbers'),
    check('day')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Day must be a number')
        .isLength({ max: 2 })
        .withMessage('Day should not be more than 2 numbers'),
    handleValidationErrors
];

//  C R E A T E   P U P P Y
router.post('/', requireAuth, validatePuppy, asyncHandler(async (req, res) => {
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

        const images = await Image.findAll({
            where: { puppyId: puppy.id }
        });

        console.log('IMAGES:', images);

        return res.json(puppy);
    } catch {
        console.log('ERROR READING ONE PUPPY', e);
    }
}));

//   R E A D   P U P P I E S
router.get('/', requireAuth, asyncHandler(async (req, res) => {
    try {
        const puppies = await Puppy.findAll();

        // console.log('PUPPIES IN BE:', puppies);

        return res.json(puppies);
    } catch {
        console.log('ERROR READING ALL PUPPIES', e);
    }
}));

//  U P D A T E   P U P P Y
router.put('/:puppyId', requireAuth, validatePuppy, asyncHandler(async (req, res) => {
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
