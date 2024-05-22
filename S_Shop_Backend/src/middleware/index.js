import jwt from "jsonwebtoken";
import Account from "../models/Account";

export const checkToken = async (req, res, next) => {
  let header_token = req.header("Authorization");
  console.log("header_token: ", header_token);
  if (typeof header_token == "undefined" || typeof header_token == null) {
    return res.status(403).json({ message: "unknown token" });
  }

  const token = header_token.replace("Bearer ", "");

  try {
    const data = jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await Account.findById(data.userId);
    if (!user) {
      throw new Error("unknown user");
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ code: 401, message: error.message });
  }
};

export const administrativePrivilegesCheck = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role == "customer") {
      return res.status(403).json({ message: "You don't have permission" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ code: 401, message: error.message });
  }
};
