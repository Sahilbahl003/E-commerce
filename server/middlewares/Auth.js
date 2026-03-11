const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {

    const token = req.headers.token;
     console.log("TOKEN:", token);
    if (!token) {
      return res.status(401).json({
        success:false,
        message:"Token missing"
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;

    next();

  } catch (error) {
    return res.status(401).json({
      success:false,
      message:"Invalid token"
    });
  }
};