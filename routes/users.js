const router = require('express').Router();
const {
  createUser, getUserById, getUsers, updateUser, updateUserAvatar,
} = require('../conrtollers/user');

router.post('/users', createUser);

router.get('/users/:userId', getUserById);

router.get('/users', getUsers);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
