import Account from "../models/Account";
import cloudinary from "../config/SetCloudinary";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const profile = async (req, res) => {
  try {
    const id = req.user._id;
    const profile = await Account.findById(id).select(
      "-password -token -isVerify -confirmationCode -confirmationExpiration -is_active -role_id"
    );
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const { username, fullName, birthday } = req.body;
    const user = await Account.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await Account.findByIdAndUpdate(
      id,
      {
        username,
        fullName,
        birthday,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ message: "update successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await Account.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(req.file);
    if (!req.file) {
      return res.status(404).json({ message: "file not found" });
    }

    if (user.avatar) {
      const public_id = user.avatar.split(
        "https://res.cloudinary.com/dwxavjnvc/image/upload/"
      );
      await cloudinary.uploader.destroy(public_id);
    }
    let image = req.file.path;
    const data = await Account.findByIdAndUpdate(
      uid,
      { avatar: image },
      { new: true }
    );

    return res
      .status(200)
      .json({ avatar: data, message: "upload avatar successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!oldPassword) {
      return res.status(400).json({ message: "Old passsword requied" });
    }

    if (!newPassword) {
      return res.status(400).json({ message: "New passsword requied" });
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password " });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    await Account.findByIdAndUpdate(user._id, { password: hash });

    return res.status(200).json({ message: "update password successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal error" });
  }
};


