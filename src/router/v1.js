import express from "express";
import { signup, signin } from "../controllers/authController";
import { findProfile } from "../controllers/userController";

import authMiddleware from "../middlewares/auth";

const router = express.Router();

router.get("/health-check", (req, res) => {
  res.send("Ok");
});

//Auth
router.post("/signup", signup);

//SignIn
router.post("/signin", signin);

//User
router.get("/profile/:idProfile", findProfile);

//Middlewares
//router.use(authMiddleware);

export default router;
