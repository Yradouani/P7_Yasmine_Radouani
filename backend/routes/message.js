const express = require ('express');
const router = express.Router();
const {getAllMessages, getMessagesFromSingleUser, createMessage, updateMessage, deleteMessage, likeMessage} = require ('./../controllers/message-controllers.js');
const multerImage = require ('../middleware/multer-config.js');
const authorization = require ('../middleware/auth.js');
// const multer = require ('multer');
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './images/');
//     },
//     filename: function(req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname)
//     }
// });
// const upload = multer({storage: storage})

router.get('/', getAllMessages);
router.get('/:userId', getMessagesFromSingleUser);
router.post('/', multerImage, createMessage);
router.put('/:id', multerImage, updateMessage);
router.delete('/:id', deleteMessage);
router.post('/:id/like', likeMessage);




module.exports = router;