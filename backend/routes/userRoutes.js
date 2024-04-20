import express from "express";
import { login, logout, profile, register, registerCourse } from "../controllers/userController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { create, get } from "../controllers/courseController.js";
import { getSingleCourse } from "../controllers/courseController.js";
import { deleteUserAccount } from "../controllers/userController.js";
import { adminlogin } from "../controllers/userController.js";

const router = express.Router();
//register user
router.route("/register").post(register);
//login user
router.route("/login").post(login);
//logout user
router.route("/logout").get(logout);
//createcourse
router.route("/courses/createCourse").post(create);
router.route("/users/registerCourse").post(isAuthenticated, registerCourse);
//get
router.route("/getCourses").get(get);
//profile
router.route("/profile").post(profile);
router.route("/getsingleCourse/:_id").get(getSingleCourse);
router.route("/deleteuser/:userId").delete(deleteUserAccount);
router.route("/adminlogin").post(adminlogin);
// router.route("registerUser/:courseId").post(registerUserInCourse);
export default router;
