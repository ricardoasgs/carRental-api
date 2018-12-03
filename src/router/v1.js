import express from "express";
import { signup, signin } from "../controllers/authController";
import { findProfile } from "../controllers/userController";
import { findCar, saveCar, updateCar } from "../controllers/carController";
import { saveRent, finalizeRent } from "../controllers/rentController";

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

//Car
router.get("/car/:carId", findCar);
router.post("/car", saveCar);
router.put("/car", updateCar);

//Rent
router.post("/rent", saveRent);
router.put("/rent", finalizeRent);

//Middlewares
//router.use(authMiddleware);

export default router;
