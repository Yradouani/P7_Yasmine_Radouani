const express = require ('express');
const router = express.Router();
const {likeMessages, getAllLike, isLiked} = require ('./../controllers/like-controllers.js');
const authorization = require ('../middleware/auth.js');

router.post('/messages/:id', authorization, likeMessages);
router.get('/messages/:id', authorization, getAllLike);

module.exports = router;
