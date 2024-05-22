const Quest = require("./../models/quest");

// Lấy tất cả các nhiệm vụ
exports.getAllQuest = async (req, res) => {
  try {
    const quests = await Quest.find();
    res.json(quests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo một nhiệm vụ mới
exports.createQuest = async (req, res) => {
  const quest = new Quest({
    description: req.body.description,
    monstersToKill: req.body.monstersToKill,
    goldReward: req.body.goldReward,
    expReward: req.body.expReward,
    id_mission: req.body.id_mission,
    completed: 0,
  });

  try {
    const newQuest = await quest.save();
    res.status(201).json(newQuest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Lấy một nhiệm vụ ngẫu nhiên
exports.getRandomQuest = async (req, res) => {
  try {
    const count = await Quest.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomQuest = await Quest.findOne().skip(random);
    res.json(randomQuest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  // Cập nhật thông tin của một nhiệm vụ
  exports.updateQuest = async (req, res) => {
    if (req.body.description != null) {
      res.quest.description = req.body.description;
    }
    if (req.body.monstersToKill != null) {
      res.quest.monstersToKill = req.body.monstersToKill;
    }
    if (req.body.goldReward != null) {
      res.quest.goldReward = req.body.goldReward;
    }
    if (req.body.id_mission != null) {
      res.quest.id_mission = req.body.id_mission;
    }
    if (req.body.expReward != null) {
      res.quest.expReward = req.body.expReward;
    }
    try {
      const updatedQuest = await res.quest.save();
      res.json(updatedQuest);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
};

// Xóa một nhiệm vụ theo id
exports.deleteQuest = async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id);
    if (!quest) {
      return res.status(404).json({ message: "Quest not found" });
    }
    await quest.remove();
    res.json({ message: "Deleted Quest" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
