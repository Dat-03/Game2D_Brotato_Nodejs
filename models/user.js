const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  coin: {
    type: Number,
    default: 0,
  },
  map: {
    type: String,
    default: "",
  },
  notification: {
    type: String,
    default: "",
  },
  id_mission: {
    type: Number,
    default: 1,
  },
  level: {
    type: Number,
    default: 1,
  },
  role: {
    type: Number,
    default: 0, // 0: player, 1: admin
  },
  id_weapon: {
    type: Number,
    default: 1,
  },
  id_charactor: {
    type: Number,
    default: 1,
  },
  
  id_user: {
    type: Number,
    unique: true,
  },
  passwordResetOTP: {
    type: String,
    default: null,
  },
});
// Sử dụng mongoose-sequence để tạo số thứ tự cho id_user
userSchema.plugin(AutoIncrement, { inc_field: "id_user" });

const User = mongoose.model("User", userSchema);
module.exports = User;
