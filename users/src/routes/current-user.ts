import express from "express";

import { currentUser } from "@biovision/trickster";

const router = express.Router()

router.get(
  '/api/users/current',
  currentUser,
  (req, res) => {
    res.send({ currentUser: req.currentUser || null })
  })

export { router as currentUserRouter }
