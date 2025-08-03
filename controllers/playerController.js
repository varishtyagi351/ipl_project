const Player = require('../models/player');
const { v4: uuidv4 } = require('uuid');

// Create Player
exports.createPlayer = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newPlayer = new Player({
      ...req.body,
      id: uuidv4(),
      image: imagePath
    });

    await newPlayer.save();
    res.status(201).json({ message: "Player created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Player
exports.updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Player.findOneAndUpdate({ id }, updateData, { new: true });

    if (!updated) return res.status(404).json({ error: "Player not found" });

    res.json({ message: "Player updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Player
exports.deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Player.findOneAndDelete({ id });

    if (!deleted) return res.status(404).json({ error: "Player not found" });

    res.json({ message: "Player deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Players with filter/sort/pagination
exports.getAllPlayers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { team, search, sortBy } = req.query;

    const query = {};
    if (team) query.team = team;
    if (search) query.name = { $regex: search, $options: 'i' };

    const sortQuery = {};
    if (sortBy === 'runs' || sortBy === 'salary') sortQuery[sortBy] = -1;

    const total = await Player.countDocuments(query);
    const players = await Player.find(query).sort(sortQuery).skip(skip).limit(limit);

    res.json({
      page,
      limit,
      total,
      players: players.map(p => ({
        id: p.id,
        name: p.name,
        image: p.image,
        role: p.role,
        team: p.team
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Player Description
exports.getPlayerDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findOne({ id });

    if (!player) return res.status(404).json({ error: "Player not found" });

    res.json({
      name: player.name,
      team: player.team,
      country: player.country,
      runs: player.runs,
      image: player.image,
      role: player.role,
      salary: player.salary
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
