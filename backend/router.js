import { Router } from "express";
import * as user from "./requestHandler.js";

const router=Router();

router.route("/verifyemail").post(user.verifyEmail); //  http://localhost:3000/api/verifyemail  (input:email)
router.route("/checkotp").post(user.checkOtp);
router.route("/signup").post(user.signUp);
router.route("/signin").post(user.signIn);
export default router;