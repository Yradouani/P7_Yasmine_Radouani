const express = require ('express');
const router = express.Router();
const {likeMessages, getLikeOfOneMessage, isLiked} = require ('./../controllers/like-controllers.js');
const authorization = require ('../middleware/auth.js');

router.post('/messages/:id', likeMessages);
router.get('/messages/:id/like', getLikeOfOneMessage);
router.get('/like/:id/like/:userId', isLiked);

module.exports = router;
