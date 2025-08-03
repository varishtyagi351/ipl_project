const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const validate = require('../middlewares/validate');
const { playerSchema, updateSchema } = require('../validation/playerValidation');
const controller = require('../controllers/playerController');

// Create Player
router.post('/', upload.single('image'), validate(playerSchema), controller.createPlayer);

// Update Player
router.patch('/:id', upload.single('image'), validate(updateSchema), controller.updatePlayer);

// Delete Player
router.delete('/:id', controller.deletePlayer);

// Get all players (filter, sort, pagination)
router.get('/', controller.getAllPlayers);

// Get detailed description
router.get('/:id/description', controller.getPlayerDescription);

module.exports = router;
