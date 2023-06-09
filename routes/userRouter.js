const router = require('express')
  .Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  deleteUserById,
} = require('../cotrollers/userController');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.delete('/:userId', deleteUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
