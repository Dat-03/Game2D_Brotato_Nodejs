const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("./../models/user");
const { login } = require("../controllers/userController");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
// Hàm tiện ích để tìm người dùng bằng username
const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

// Route đăng ký người dùng mới
// http://localhost:3000/users/register
// Route for user registration
router.post("/register", async (req, res) => {
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
});

// Route đăng nhập
// http://localhost:3000/users/login
router.post("/login", login);
// Hàm tiện ích để cập nhật thông tin người dùng
const updateUser = async (username, newData) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { $set: newData },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    throw new Error("User update failed");
  }
};

// Route cập nhật điểm số
// http://localhost:3000/users/score
router.post("/score", async (req, res) => {
  const { username, score } = req.body;

  try {
    await updateUser(username, { score });
    res.status(200).json({ message: "Score saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route cập nhật coin
// http://localhost:3000/users/coin
router.post("/coin", async (req, res) => {
  const { username, coin } = req.body;

  try {
    await updateUser(username, { coin });
    res.status(200).json({ message: "Coin saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// data mẫu thunder client
// { "username": "sang", "coin": 1000 }

// Route cập nhật nhiệm vụ
// http://localhost:3000/users/quest
router.post("/quest", async (req, res) => {
  const { username, quest } = req.body;

  try {
    await updateUser(username, { quest });
    res.status(200).json({ message: "Quest saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route cập nhật id nhiệm vụ
// http://localhost:3000/users/id_mission
router.post("/id_mission", async (req, res) => {
  const { username, id_mission } = req.body;

  try {
    await updateUser(username, { id_mission });
    res.status(200).json({ message: "id_mission saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route cập nhật thông tin người dùng
// http://localhost:3000/users/update
router.patch("/update", async (req, res) => {
  const { username, newData } = req.body;

  try {
    await updateUser(username, newData);
    res.status(200).json({ message: "User information updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route cập nhật phần thưởng khi hoàn thành nhiệm vụ
// http://localhost:3000/users/rewards
router.post("/rewards", async (req, res) => {
  const { username, gold, exp } = req.body;

  try {
    let user = await findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.coin += gold;
    user.score += exp;

    await user.save();

    return res.status(200).json({ message: "Rewards updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route lấy thông tin người dùng
// http://localhost:3000/users/:username
router.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route xóa người dùng
// http://localhost:3000/users/:username
router.delete("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route cập nhật mật khẩu
// http://localhost:3000/users/change-password
router.post("/change-password", async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUser(username, { password: hashedPassword });

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route reset mật khẩu
// http://localhost:3000/users/reset-password
router.post("/reset-password", async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findOne({ username, email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({ message: "Reset password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// send otp to email
// http://localhost:3000/users/send-otp
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({ message: "OTP sent" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// verify otp
// http://localhost:3000/users/verify-otp
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email, otp });
    if (!user) {
      return res.status(404).json({ message: "OTP not correct" });
    } else {
      return res.status(200).json({ message: "OTP correct" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route cập nhật thông báo
// http://localhost:3000/users/notification
router.post("/notification", async (req, res) => {
  const { username, notification } = req.body;

  try {
    await updateUser(username, { notification });
    res.status(200).json({ message: "Notification saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Cập nhật map
// http://localhost:3000/users/map
router.post("/map", async (req, res) => {
  const { username, map } = req.body;

  try {
    await updateUser(username, { map });
    res.status(200).json({ message: "Map saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// lấy id_weapon theo id_user
// http://localhost:3000/users/user/:id_user/id_weapon
router.get("/user/:id_user/id_weapon", async (req, res) => {
  try {
    const { id_user } = req.params; // Lấy id_user từ params
    const user = await User.findOne({ id_user }); // Tìm user trong data dựa trên id_user

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Trả về id_weapon của user
    res.json({ id_weapon: user.id_weapon });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// forgot password
// http://localhost:3000/users/forgotpassword
router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Chuyển thành chuỗi
    user.passwordResetOTP = otp;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "tansang6676@gmail.com",
        pass: "wnwaoqfaqzcepmdl",
      },
    });

    const mailOptions = {
      from: "tansang6676@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to send OTP via email" });
      }
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "OTP sent successfully to your email" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// data mẫu thunder client
// { "email": " [email protected]"} 


// reset password
// http://localhost:3000/users/resetpassword
router.post("/resetpassword", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    } else if (user.passwordResetOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.passwordResetOTP = undefined; // Xóa OTP sau khi reset thành công

      await user.save();

      return res.status(200).json({ message: "Password reset successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// data mẫu thunder client
// { "email": " [email protected]", "otp": "123456", "newPassword": "123456" }







module.exports = router;
