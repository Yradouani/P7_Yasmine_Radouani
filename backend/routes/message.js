import express from 'express';
const router = express.Router();
import {getAllMessages, getMessagesFromSingleUser, createMessage, updateMessage, deleteMessage, likeMessage} from './../controllers/message-controllers.js';

router.get('/', getAllMessages);
router.get('/:userId', getMessagesFromSingleUser);
router.post('/', createMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);
router.post('/:id/like', likeMessage);




export default router;