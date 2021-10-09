import express from 'express';
const router = express.Router();
import {signUp, logIn, getAllUsers, getOneUser, deleteUser} from './../controllers/user-controllers.js'

router.post('/auth/signup', signUp);
router.post('/auth/login', logIn);
router.get('/users', getAllUsers);
router.get('/users/:userid', getOneUser)
router.delete('/users/:userid', deleteUser);


export default router;