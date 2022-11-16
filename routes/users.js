const router = require('express').Router();
const {
  getUserById, getUsers, updateUser, updateUserAvatar,
} = require('../conrtollers/user');

// router.post('/users', createUser);

// router.post('/login', login);

// router.get('/ss', search);

router.get('/users/:userId', getUserById);

router.get('/users', getUsers);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
