const express = require ('express');
const router = express.Router();
const {signUp, logIn, getAllUsers, getOneUser, deleteUser, updateUser} = require ('./../controllers/user-controllers.js')
const multerImage = require ('../middleware/multer-config.js')

router.post('/auth/signup', signUp);
router.post('/auth/login', logIn);
router.get('/users', getAllUsers);
router.get('/users/:userid', getOneUser);
router.put('/users/:userid', multerImage, updateUser);
router.delete('/users/:userid', deleteUser);


module.exports = router;