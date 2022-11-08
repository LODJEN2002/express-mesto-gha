const router = require('express').Router();
const {
  createUser, getUserById, getUsers, updateUser, updateUserAvatar,
} = require('../conrtollers/user');

router.post('/', createUser);

router.get('/:userId', getUserById);

router.get('/', getUsers);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
