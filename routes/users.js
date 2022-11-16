const router = require('express').Router();
const {
  getUserById, getUsers, updateUser, updateUserAvatar, getMyProfiel,
} = require('../conrtollers/user');

router.get('/users/me', getMyProfiel);

router.get('/users/:userId', getUserById);

router.get('/users', getUsers);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
