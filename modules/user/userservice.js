import User from "./usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await User.create({
    ...data,
    password: hashedPassword,
  });
  return user;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  if (!user.isActive) {
  throw new Error("User is inactive");
}

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
};

export const getAllUsers = async () => {
  return await User.find().select("-password");
};

export const updateUserRole = async (id, role) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  user.role = role;
  await user.save();

  return user;
};

export const toggleUserStatus = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  user.isActive = !user.isActive;
  await user.save();

  return user;
};