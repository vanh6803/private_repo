import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Account from "../models/Account";
import { OAuth2Client } from "google-auth-library";
import {
  generateConfirmationCode,
  generateExpirationTime,
  generateRandomPassword,
  generateUsername,
} from "../utils/AccountService";

import { sendEmail } from "../utils/NodemailerService";

export const register = async (req, res) => {
  try {
    const { email, password, role_id } = req.body;

    if (!email) {
      return res.status(403).json({ message: "email is required" });
    }
    if (!password) {
      return res.status(403).json({ message: "email is password" });
    }
    const salt = await bcrypt.genSalt(10);

    const existingUser = await Account.findOne({ email });

    if (existingUser) {
      console.log("Email already exists");
      if (existingUser.isVerify == false) {
        console.log("email don't verify");
        let newPassword = await bcrypt.hash(password, salt);
        let newConfirmationCode = generateConfirmationCode();
        let newConfirmationExpiration = generateExpirationTime();
        await Account.findByIdAndUpdate(existingUser._id, {
          password: newPassword,
          confirmationCode: newConfirmationCode,
          confirmationExpiration: newConfirmationExpiration,
        });

        sendEmail(
          email,
          "Confirmation Code",
          `Your confirmation code: ${newConfirmationCode}`
        );
        return res.status(200).json({
          message:
            "Email already exists, resend confirmation code successfully",
        });
      }

      return res
        .status(409)
        .json({ message: "Email already exists", isExit: true });
    }

    // create new account and hash password
    const newAccount = new Account({
      email,
      password,
      is_active: true,
      role_id: role_id,
    });

    newAccount.password = await bcrypt.hash(password, salt);

    const confirmationCode = generateConfirmationCode();

    newAccount.confirmationCode = confirmationCode;
    newAccount.confirmationExpiration = generateExpirationTime();

    const username = generateUsername(email);
    newAccount.username = username;

    await newAccount.save();

    sendEmail(
      email,
      "Confirmation Code",
      `Your confirmation code: ${confirmationCode}`
    );

    return res.status(201).json({ message: "create account successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await Account.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    if (user.isVerify == false) {
      return res
        .status(401)
        .json({ message: "Unauthenticated email", isVerify: false });
    }

    if (user.is_active == false) {
      return res.status(403).json({ message: "your account is inactive" });
    }
    // compare password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // if password matches, create a new token
    const token = jwt.sign({ userId: user._id }, process.env.PRIVATE_KEY, {
      expiresIn: "14d",
    });

    // update token to db
    user.token = token;
    await user.save();

    return res.status(200).json({
      token,
      message: "login successful",
      role: user.role_id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const logout = async (req, res, next) => {
  try {
    // find user
    const user = await Account.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerify == false) {
      return res
        .status(401)
        .json({ message: "Unauthenticated email", isVerify: false });
    }

    // remove token
    user.token = null;

    await user.save();

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("error - logout: ", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { code } = req.params;

    const user = await Account.findOne({ confirmationCode: code });

    if (!user) {
      return res.status(400).json({ message: "Verification code is invalid" });
    }

    const now = new Date();
    if (now > user.confirmationExpiration) {
      return res.status(400).json({ message: "Verification code has expired" });
    }

    user.isVerify = true;
    user.confirmationCode = null;
    user.confirmationExpiration = null;

    await user.save();

    return res.status(200).json({ message: "Email confirmation successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resendConfirmationCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email requied" });
    }

    const existingUser = await Account.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "not found" });
    }

    if (existingUser.isVerify) {
      return res.status(400).json({ message: "Email is verify" });
    }

    const confirmationCode = generateConfirmationCode();

    existingUser.confirmationCode = confirmationCode;
    existingUser.confirmationExpiration = generateExpirationTime();

    await existingUser.save();

    sendEmail(
      email,
      "Confirmation Code",
      `Your confirmation code: ${confirmationCode}`
    );
    return res.status(200).json({
      message: "Confirmation code resend successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginWithGoogle = async (req, res, next) => {
  // The token you received from the Android app
  const idToken = req.body.idToken; //token from google

  if (!idToken) {
    return res.status(400).json({ message: "Google ID token is required" });
  }
  const client = new OAuth2Client(process.env.CLIENT_ID);
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.CLIENT_ID, // Your Google Client ID for the web application
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    const existingUser = await Account.findOne({ email });
    if (existingUser) {
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.KEY_TOKEN,
        {
          expiresIn: "14d",
        }
      );
      existingUser.token = token;
      await existingUser.save();
      return res.status(200).json({ token, message: "Login successful" });
    } else {
      const username = name;
      const password = generateRandomPassword(12);

      const newUser = new model.account({
        email,
        password,
        username,
        isVerify: true,
        is_active: true,
      });

      // Save the new user to the database
      await newUser.save();

      // Perform the login logic for the new user and return a token
      const token = jwt.sign({ userId: newUser._id }, process.env.KEY_TOKEN, {
        expiresIn: "14d",
      });
      newUser.token = token;
      await newUser.save();
      return res.status(200).json({
        token,
        message: "Login successful",
        isNewAccount: true,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({ message: "email requied" });
    }
    const user = await Account.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Account not found" });
    }
    const newPassword = generateRandomPassword(12);

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // save new password
    user.password = hashedPassword;
    await user.save();

    sendEmail(email, "New password", `New password for you: ${newPassword}`);
    return res.status(200).json({
      message: "New pasword in your email ",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
