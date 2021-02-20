const mongoose = require("mongoose");
const User = require("../model/user");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");
const PasswordResetEmail = require("../utils/email");
const crypto = require("crypto");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const user = await User.create(data);

  if (!user) {
    throw new MyError("Хэрэглэгч бүртгэх амжилтгүй боллоо", 500);
  }

  const jwt = user.getJWT();

  res.status(200).json({
    success: true,
    data: user,
    token: jwt,
  });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new MyError("Имэйл, нууц үг оруулна уу", 400);
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new MyError("Имэйл нууц үгээ шалгана уу", 401);
  }

  const ok = await user.checkPassword(password);

  if (!ok) {
    throw new MyError("Имэйл нууц үгээ шалгана уу", 401);
  }

  const token = user.getJWT();

  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(200).cookie("book-app", token, cookieOptions).json({
    success: true,
    user,
    token,
  });
});

exports.logOut = asyncHandler(async (req, res, next) => {
  const cookieOptions = {
    expires: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
  };

  res.status(200).cookie("book-app", null, cookieOptions).json({
    success: true,
    data: "logged out",
  });
});

exports.updateUserInfo = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new MyError("Хэрэглэгчийн мэдээлэл олдсонгүй");
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.email) {
    throw new MyError("Имэйл дамжуулна уу", 400);
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new MyError("Хэрэглэгч олдсонгүй");
  }

  const resetToken = user.generateResetPasswordToken();

  await user.save();

  const link = `https://www.zolboo.com/passwordReset/${resetToken}`;
  PasswordResetEmail({
    to: "zolboojargalsaikhan9@gmail.com",
    subject: "Нууц үг сэргээх",
    html: `<b>Сайн байна уу</b><br><br>Та нууц үг сэргээх хүсэлт гаргасан байна. <br> Доорх линкээр дамжин нууц үгээ сэргээнэ үү.<br><br> <a href=${link}>${link}</a>`,
  });

  res.status(200).json({
    success: true,
    token: resetToken,
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { password, token } = req.body;

  if (!password || !token) {
    throw new MyError("Нууц үг, токен дамжуулна уу", 400);
  }

  const encrypted = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: encrypted,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new MyError("Токен хүчингүй байна", 400);
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  console.log("user", user);

  res.status(200).json({
    success: true,
    user,
    token: user.getJWT(),
  });
});

exports.passwordChange = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("+password");

  if (!user) {
    throw new MyError("Хэрэглэгч олдсонгүй", 400);
  }

  const ok = await user.checkPassword(req.body.oldPassword);
  console.log("ok", ok);

  if (!ok) {
    throw new MyError("Хуучин нууц үг буруу байна", 400);
  }

  const newPassword = req.body.newPassword;

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    data: user,
  });
});
