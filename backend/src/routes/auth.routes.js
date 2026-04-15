import { Router } from 'express'
import authUser from '../middlewares/auth.middleware.js';
import {loginUserController, logoutUserController, registerUserController, getMeController} from '../controllers/auth.controller.js'

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", registerUserController)

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login", loginUserController)


/**
 * @route POST /api/auth/logout
 * @desc Clear token tken from User Cookie and add token in Blacklist
 * @access Public
 */
authRouter.get("/logout", logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @desc Get the details of the User
 * @access Public
 */
authRouter.get("/get-me", authUser, getMeController)

export default authRouter;