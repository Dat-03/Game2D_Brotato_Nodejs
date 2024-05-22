const express = require("express");
const router = express.Router();
const Quest = require("./../models/quest");
const questController = require("../controllers/questController");

// Lấy tất cả các nhiệm vụ
router.get("/", async (req, res) => {
  try {
    const quest = await Quest.find();
    res.status(200).json(quest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tạo một nhiệm vụ mới
router.post("/", async (req, res) => {
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
});

// Lấy một nhiệm vụ ngẫu nhiên
router.get("/random", async (req, res) => {
  try {
    const count = await Quest.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomQuest = await Quest.findOne().skip(random);
    res.status(200).json(randomQuest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cập nhật thông tin của một nhiệm vụ
router.patch("/:id", getQuest, async (req, res) => {
  if (req.body.description != null) {
    res.quest.description = req.body.description;
  }
  if (req.body.monstersToKill != null) {
    res.quest.monstersToKill = req.body.monstersToKill;
  }
  if (req.body.goldReward != null) {
    res.quest.goldReward = req.body.goldReward;
  }
  if (req.body.expReward != null) {
    res.quest.expReward = req.body.expReward;
  }
  if (req.body.id_mission != null) {
    res.quest.id_mission = req.body.id_mission;
  }
  if (req.body.completed != null) {
    res.quest.completed = req.body.completed;
  }
  try {
    const updatedQuest = await res.quest.save();
    res.json(updatedQuest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getQuest(req, res, next) {
  let quest;
  try {
    quest = await Quest.findById(req.params.id);
    if (quest == null) {
      return res.status(404).json({ message: "Cannot find quest" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.quest = quest;
  next();
}

router.patch("/quest/:id", getQuest, async (req, res) => {
  try {
    const { killedMonsters } = req.body;
    const { id } = req.params;

    if (killedMonsters < 0) {
      return res
        .status(400)
        .json({ message: "Số lượng quái vật phải lớn hơn hoặc bằng 0" });
    }

    // Kiểm tra xem số lượng quái vật đã giết có đủ không
    if (killedMonsters >= res.quest.monstersToKill) {
      res.quest.completed = 1;
      const updatedQuest = await res.quest.save();
      res.json(updatedQuest);
    } else {
      res
        .status(400)
        .json({ message: "Số lượng quái vật chưa đủ để hoàn thành nhiệm vụ" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware để tìm kiếm nhiệm vụ theo id_mission
async function getQuest(req, res, next) {
  try {
    const id = req.params.id;
    const quest = await Quest.findOne({ id_mission: id });

    if (quest == null) {
      return res.status(404).json({ message: "Không tìm thấy nhiệm vụ" });
    }

    res.quest = quest;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
// router.delete("/:id", getQuest, async (req, res) => {
//   try {
//     await res.quest.remove();
//     res.json({ message: "Deleted quest" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// xóa nhiệm vụ
router
  .route("/")
  .get(questController.getAllQuest)
  .post(questController.createQuest)
  .get(questController.getRandomQuest);

router
  .route("/:id")
  .delete(questController.deleteQuest)

module.exports = router;
