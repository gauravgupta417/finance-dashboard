import { registerUser, loginUser,  getAllUsers,updateUserRole,toggleUserStatus} 
from "./userservice.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: "User already registered" });
  }
};

export const login = async (req, res) => {
  try {
    const data = await loginUser(req.body.email, req.body.password);
    res.json(data);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const user = await updateUserRole(req.params.id, req.body.role);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const toggleStatus = async (req, res) => {
  try {
    const user = await toggleUserStatus(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};