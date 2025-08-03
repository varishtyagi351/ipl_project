const Joi = require('joi');

const allowedRoles = ['Batsman', 'Bowler', 'All-rounder'];

exports.playerSchema = Joi.object({
  name: Joi.string().trim().required(),
  team: Joi.string().trim().required(),
  country: Joi.string().trim().required(),
  runs: Joi.number().integer().required(),
  role: Joi.string().valid(...allowedRoles).required(),
  salary: Joi.number().positive().required(),
  image: Joi.any() // Multer will handle file upload separately
});

exports.updateSchema = Joi.object({
  name: Joi.string().trim(),
  team: Joi.string().trim(),
  country: Joi.string().trim(),
  runs: Joi.number().integer(),
  role: Joi.string().valid(...allowedRoles),
  salary: Joi.number().positive(),
  image: Joi.any()
});
