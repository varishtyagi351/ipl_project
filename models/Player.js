const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const playerSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4
  },
  name: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  runs: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    enum: ['Batsman', 'Bowler', 'All-rounder'],
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  image: {
    type: String // path or URL to image
  }
});

module.exports = mongoose.model('Player', playerSchema);

