const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
  description: String, // Mô tả nhiệm vụ
  monstersToKill: Number, // Số lượng quái phải giết
  goldReward: Number, // Phần thưởng vàng
  expReward: Number, // Phần thưởng kinh nghiệm
  id_mission: Number, // id của nhiệm vụ 
});

module.exports = mongoose.model('Quest', questSchema);
