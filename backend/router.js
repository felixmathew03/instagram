import { Router } from "express";
import * as user from "./requestHandler.js";
import Auth from "./middleware/Auth.js";

const router=Router();

router.route("/home").get(Auth,user.home); //  http://localhost:3000/api/verifyemail  (input:email)
router.route("/verifyemail").post(user.verifyEmail); //  http://localhost:3000/api/verifyemail  (input:email)
router.route("/signup").post(user.signUp);     //  http://localhost:3000/api/signup  (input:email,username,password,cpassword)
router.route("/signin").post(user.signIn);     //  http://localhost:3000/api/signin  (input:email,password)

export default router;