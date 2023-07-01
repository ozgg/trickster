import express, { Request, Response } from "express";
import { body } from 'express-validator'
import { validateRequest, BadRequestError } from "@biovision/trickster";

import { Password } from "../services/password";
import { User } from "../models/user"
import jwt from "jsonwebtoken";

const router = express.Router()

router.post(
  '/api/users/sign-in',
  [
    body('email')
      .isEmail()
      .withMessage('Invalid email'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials 1')
    }

    const passwordsMatch = await Password.verifyPassword(existingUser.password, password)
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials 2')
    }

    const userJwt = jwt.sign({
      id: existingUser.id,
      email: existingUser.email
    }, process.env.JWT_KEY!)

    req.session = { jwt: userJwt }

    res.status(200).send(existingUser)
  }
)

export { router as signInRouter }
