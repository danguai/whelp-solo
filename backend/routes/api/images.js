const express = require('express');
const aws = require('aws-sdk');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Image } = require('../../db/models');

const router = express.Router();

const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'us-east-1';

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

//   R E A D   B U C K E T
router.get('/aws', requireAuth, asyncHandler(async (req, res, next) => {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        ContentType: fileType
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) return next(err);

        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        res.json(returnData);
    });
}));

//   R E A D   I M A G E S
router.get('/', asyncHandler(async (req, res) => {
    const images = await Image.findAll();
    return res.json(images);
}));

//  U P D A T E   I M A G E
router.put('/:imageId', requireAuth, asyncHandler(async (req, res) => {
    const id = req.params.imageId;

    delete req.body.id;

    const [_updateCount, image] = await Image.update(req.body, {
        where: { id },
        returning: true,
        plain: true
    });

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
