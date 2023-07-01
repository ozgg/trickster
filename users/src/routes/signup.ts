import express, { Request, Response } from "express";
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { BadRequestError, validateRequest } from "@biovision/trickster";

import { User } from "../models/user"

const router = express.Router()

router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Invalid email'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 70 })
      .withMessage('Password should be 4 to 70 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new BadRequestError('User with this email exists')
    }

    const user = User.build({ email, password })
    await user.save()

    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!)

    req.session = { jwt: userJwt }

    res.status(201).send(user)
  })

export { router as signupRouter }
