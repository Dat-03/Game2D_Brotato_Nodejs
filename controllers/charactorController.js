const Charactor = require("../models/charactor");

// get all charactors
// http://localhost:3000/charactor
exports.getAllCharactors = async (req, res) => {
  try {
    const charactor = await Charactor.find();
    res.status(200).json({
      status: "success",
      data: {
        charactor,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
// get charactor by id
// http://localhost:3000/charactor/1
exports.getCharactor = async (req, res) => {
  try {
    const charactor = await Charactor.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        charactor,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Charactor not found",
    });
  }
};

// create charactor
// http://localhost:3000/charactor
exports.createCharactor = async (req, res) => {
  try {
    const newCharactor = await Charactor.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        charactor: newCharactor,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
// data mẫu để test create charactor
// { "id_charactor": 1, "name": "Goku", "statusBuy": "not buy", "statusUsed": "not used" }
// update charactor by id
// http://localhost:3000/charactor/1
exports.updateCharactor = async (req, res) => {
  try {
    const charactor = await Charactor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!charactor) {
      return res.status(404).json({
        status: "fail",
        message: "Charactor not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        charactor,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// delete charactor by id
// http://localhost:3000/charactor/1
exports.deleteCharactor = async (req, res) => {
  try {
    await Charactor.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// update charactor by id
exports.updateCharactorByIdCharactor = async (req, res) => {
  try {
    const charactor = await Charactor.findOneAndUpdate(
      { id_charactor: req.params.id_charactor },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!charactor) {
      return res.status(404).json({
        status: "fail",
        message: "Charactor not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        charactor,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Cập nhật trạng thái đã mua của nhân vật dựa trên id_charactor
exports.updateStatusBuyByIdCharactor = async (req, res) => {
  try {
    const charactor = await Charactor.findOneAndUpdate(
      { id_charactor: req.params.id_charactor },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!charactor) {
      return res.status(404).json({
        status: "fail",
        message: "Charactor not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        charactor,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
// Cập nhật trạng thái đã sử dụng của nhân vật dựa trên statusBuy nếu statusBuy = "used"
exports.updateStatusUsedByIdCharactor = async (req, res) => {
  try {
    const charactor = await Charactor.findOneAndUpdate(
      { id_charactor: req.params.id_charactor },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!charactor) {
      return res.status(404).json({
        status: "fail",
        message: "Charactor not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        charactor,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
