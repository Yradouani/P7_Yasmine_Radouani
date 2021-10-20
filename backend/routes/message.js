const express = require ('express');
const router = express.Router();
const {getAllMessages, getMessagesFromSingleUser, createMessage, updateMessage, deleteMessage, likeMessage} = require ('./../controllers/message-controllers.js');
const multerImage = require ('../middleware/multer-config.js');
const authorization = require ('../middleware/auth.js');

router.get('/', getAllMessages);
router.get('/:userId', getMessagesFromSingleUser);
router.post('/', authorization, multerImage, createMessage);
router.put('/:id', authorization, multerImage, updateMessage);
router.delete('/:id', authorization, deleteMessage);
router.post('/:id/like', likeMessage);




module.exports = router;