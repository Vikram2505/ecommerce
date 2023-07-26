import express from 'express';
import { SignUp, SignIn, AllUsers, GoogleSignIn, BlockUser } from '../controller/User.js';
import auth from "../middleware/auth.js";
import verifyRole from "../middleware/verifyRole.js";
import { Role } from "../_helpers/role.js";


const router = express.Router();

/**
 * @desc        Create user
 * @route       /user/sign-up
 * @requestBody   {"name","email","password"}
 */
router.post("/sign-up", SignUp);

/**
 * @desc        Login user
 * @route       /user/sign-in
 * @requestBody   {"email","password"}
 */
router.post("/sign-in", SignIn);

/**
 * @desc        Get all user
 * @route       /user/all-user
 * @NOTE        Access by admin only
 */
router.get("/all-user", auth, verifyRole(Role.Admin), AllUsers);

// @desc        google signin user
// @route       /user/google-sign-in
router.post("/google-sign-in", GoogleSignIn);

// @desc        block user
// @route       /user/block-user/:id
router.post("/block-user/:id", auth, verifyRole(Role.Admin), BlockUser);

export default router;