const Weapon = require("../models/weapon");

// Lấy tất cả các vũ khí
exports.getAllWeapons = async (req, res) => {
  try {
    const weapons = await Weapon.find();
    res.json(weapons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo một vũ khí mới
// http://localhost:3000/weapon
exports.createWeapon = async (req, res) => {
  const weapon = new Weapon({
    weaponName: req.body.weaponName,
    damage: req.body.damage,
    image: req.body.image,
    price: req.body.price,
    statusUsed: req.body.statusUsed,
    statusBuy: req.body.statusBuy,
    id_weapon: req.body.id_weapon,
    id_user: req.body.id_user,
  });

  try {
    const newWeapon = await weapon.save();
    res.status(201).json(newWeapon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
// data mẫu để test API POST http://localhost:3000/weapon
// {
//   "weaponName": "AKM", 
//   "damage": 50,
//   "image": "https://i.imgur.com/5X8Y9lO.jpg",
//   "price": 1000,
//   "statusUsed": false,
//   "statusBuy": false,
//   "id_weapon": 1
// }



// Lấy một vũ khí dựa trên id
exports.getWeapon = async (req, res) => {
  try {
    const weapon = await Weapon.findById(req.params.id);
    res.json(weapon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật một vũ khí dựa trên id
exports.updateWeapon = async (req, res) => {
  try {
    const weapon = await Weapon.findById(req.params.id);
    if (!weapon) {
      return res.status(404).json({ message: "Weapon not found" });
    }

    // Cập nhật thông tin vũ khí nếu được cung cấp trong req.body
    if (req.body.weaponName) {
      weapon.weaponName = req.body.weaponName;
    }
    if (req.body.damage) {
      weapon.damage = req.body.damage;
    }
    if (req.body.image) {
      weapon.image = req.body.image;
    }
    if (req.body.price) {
      weapon.price = req.body.price;
    }
    if (req.body.statusUsed !== undefined) {
      weapon.statusUsed = req.body.statusUsed;
    }
    if (req.body.statusBuy !== undefined) {
      weapon.statusBuy = req.body.statusBuy;
    }
    if (req.body.id_weapon) {
      weapon.id_weapon = req.body.id_weapon;
    }

    const updatedWeapon = await weapon.save();
    res.json(updatedWeapon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// Xóa một vũ khí dựa trên id_weapon của vũ khí
exports.deleteWeapon = async (req, res) => {
  try {
    const weapon = await Weapon.findById(req.params.id);
    if (!weapon) {
      return res.status(404).json({ message: "Weapon not found" });
    }
    await weapon.deleteOne(); // Sử dụng deleteOne() để xóa vũ khí
    res.json({ message: "Deleted Weapon" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Cập nhật id_weapon của vũ khí dựa trên id 
exports.updateIdWeapon = async (req, res) => {
  try {
    const weapon = await Weapon.findByIdAndUpdate(
      req.params.id,
      { id_weapon: req.body.id_weapon },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!weapon) {
      return res.status(404).json({
        status: "fail",
        message: "Weapon not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        weapon,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};



// Cập nhật trạng thái đã mua của vũ khí dựa trên id
exports.updateStatusBuyByIdWeapon = async (req, res) => {
  try {
    const weapon = await Weapon.findByIdAndUpdate(
      req.params.id,
      { statusBuy: req.body.statusBuy },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!weapon) {
      return res.status(404).json({
        status: "fail",
        message: "Weapon not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        weapon,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Cập nhật trạng thái đã sử dụng của vũ khí dựa trên statusBuy nếu statusBuy = "used"
exports.updateStatusUsedByIdWeapon = async (req, res) => {
  try {
    const weapon = await Weapon.findByIdAndUpdate(
      req.params.id,
      { statusUsed: req.body.statusUsed },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!weapon) {
      return res.status(404).json({
        status: "fail",
        message: "Weapon not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        weapon,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// get id_weapon dựa vào id_user 
// http://localhost:3000/weapon/id_user/:id_user
exports.getIdWeaponByIdUser = async (req, res) => {
  try {
    const weapon = await Weapon.find({ id_user: req.params.id_user });
    if (!weapon) {
      return res.status(404).json({ message: "Weapon not found" });
    }
    res.json(weapon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
