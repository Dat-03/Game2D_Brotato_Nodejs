const bcrypt = require("bcryptjs");
const Account = require("../models/user");

// register
exports.register = async (req, res) => {
  try {
    // Lấy thông tin từ request body
    const { username, password, email } = req.body;

    // Kiểm tra xem username hoặc email đã tồn tại trong hệ thống chưa
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    // Lưu user vào cơ sở dữ liệu
    await newUser.save();

    // Trả về thông tin user đã đăng ký thành công
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        id_user: newUser.id_user,
        username: newUser.username,
        email: newUser.email,
        score: newUser.score,
        coin: newUser.coin,
        map: newUser.map,
        notification: newUser.notification,
        id_mission: newUser.id_mission,
        level: newUser.level,
        role: newUser.role,
        
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Account.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const userInfo = {
      _id: user._id,
      id_user: user.id_user,
      username: user.username,
      score: user.score,
      coin: user.coin,
      map: user.map,
      status: user.status,
      notification: user.notification,
      id_mission: user.id_mission,
      role: user.role,
      id_weapon: user.id_weapon,
      id_charactor: user.id_charactor,
    };

    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
