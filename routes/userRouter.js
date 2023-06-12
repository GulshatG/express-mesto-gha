const router = require('express')
  .Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  deleteUserById,
  getMe,
} = require('../cotrollers/userController');
const { celebrateUserById } = require('../celebrate/celebrateUser');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', celebrateUserById, getUserById);
router.delete('/:userId', celebrateUserById, deleteUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
