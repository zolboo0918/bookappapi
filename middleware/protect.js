const asyncHandler = require("./asyncHandler");
const MyError = require("../utils/myError");
const jwt = require("jsonwebtoken");

exports.checkToken = asyncHandler(async (req, res, next) => {
  let token = null;

  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies) {
    token = req.cookies["book-token"];
  }

  if (!token) {
    throw new MyError("Токен байхгүй байна", 401);
  }

  const tokenObj = jwt.verify(token, process.env.TOKEN_KEY);

  if (!tokenObj) {
    throw new MyError("Токен алдаатай байна", 401);
  }

  req.userId = tokenObj.id;

  next();
});
