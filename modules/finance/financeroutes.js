import express from "express";
import auth from "../../middleware/auth.js";
import authorize from "../../middleware/role.js";
import {create,getAll,update,remove} from "./financecontroller.js";

const router = express.Router();

router.get("/", auth,(req, res, next) => {
    if (req.user.role === "viewer") {
      return res.status(403).json({ message: "Viewers cannot access finance records" });
    }next();  },  getAll);
    
router.post("/", auth, authorize("create"), create);
router.put("/:id", auth, authorize("update"), update);
router.delete("/:id", auth, authorize("delete"), remove);

export default router;