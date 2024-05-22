const mongoose = require("mongoose");

const charactorSchema = new mongoose.Schema({
  charactorName: {
    type: String,
    required: true,
  },
  damage: {
    type: Number,
    required: true,
  },
  currentHealth: {
    type: Number,
    required: true,
  },
  maxHealth: {
    type: Number,
    required: true,
  },
  // "used" hoặc "unused"
  statusUsed: {
    type: String,
    default: "unused",
  },
  // trạng thái đã mua hay chưa
  statusBuy: {
    type: String,
    default: "unbuy",
  },
  id_charactor: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  id_user: {
    type: String,
    required: true,
  },
});
const Charactor = mongoose.model("Charactor", charactorSchema);

module.exports = Charactor;
