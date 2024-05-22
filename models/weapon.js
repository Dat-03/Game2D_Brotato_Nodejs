const mongoose = require("mongoose");

const weaponSchema = new mongoose.Schema({
  weaponName: {
    type: String,
    required: true,
  },
  damage: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  statusUsed: {
    type: Boolean,
    default: 0,
  },
  statusBuy: {
    type: Boolean,
    default: 0,
  },
  id_weapon: {
    type: Number,
    required: true,
  },
  id_user: {
    type: String,
    required: true,
  },
});
const Weapon = mongoose.model("weapon", weaponSchema);

module.exports = Weapon;
