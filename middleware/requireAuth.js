const accountModel = require("../model/AccountModel");
const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, "DEEP_BLUE_SEA");

    req.user = await accountModel.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;