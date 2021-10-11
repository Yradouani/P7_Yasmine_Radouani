const express = require ('express');
const router = express.Router();
const {getAllMessages, getMessagesFromSingleUser, createMessage, updateMessage, deleteMessage, likeMessage} = require ('./../controllers/message-controllers.js');

router.get('/', getAllMessages);
router.get('/:userId', getMessagesFromSingleUser);
router.post('/', createMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);
router.post('/:id/like', likeMessage);




module.exports = router;