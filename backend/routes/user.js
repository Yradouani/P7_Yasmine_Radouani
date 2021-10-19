const express = require ('express');
const router = express.Router();
const {signUp, logIn, getAllUsers, getOneUser, deleteUser, updateUser} = require ('./../controllers/user-controllers.js')
const multerImage = require ('../middleware/multer-config.js');
const authorization = require ('../middleware/auth.js')

router.post('/auth/signup', multerImage, signUp);
router.post('/auth/login', logIn);
// router.post('/infos', userInfos);
router.get('/users', getAllUsers);
router.get('/users/:userId', getOneUser);
router.put('/users/:userId', multerImage, updateUser);
router.delete('/users/:userId', deleteUser);


module.exports = router;