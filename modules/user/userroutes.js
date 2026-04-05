import express from "express";
import { register, login, getUsers, updateRole, toggleStatus } from "./usercontroller.js";
import auth from "../../middleware/auth.js";
import authorizeadmin from "../../middleware/authadmin.js"

const router = express.Router();
router.post("/register", register);
router.post("/login", login);

//only admin can access this routes
router.get("/", auth, authorizeadmin(["admin"]), getUsers);
router.patch("/:id/role", auth, authorizeadmin(["admin"]), updateRole);
router.patch("/:id/status", auth, authorizeadmin(["admin"]), toggleStatus);

export default router;