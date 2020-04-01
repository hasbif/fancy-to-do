const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  try {
    const token = req.headers.access_token;
    if (!token) {
      res.status(404).json({
        message: "token not found"
      });
    } else {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.userId = decoded.userId;
      next();
    }
  } catch (error) {
    res.status(400).json({
      message: "log in first"
    });
    console.log(error);
  }
}

module.exports = authentication;
