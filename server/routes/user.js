import express from 'express'

import {getUser, getUserFriends , addRemoveFriend} from '../controllers/user.js'

import { verifyToken } from '../middleware/auth.js'

const userRouter = express.Router()

/*GET USER FRIENDS */
userRouter.get('/:id', verifyToken, getUser)
userRouter.get('/:id/friends', verifyToken, getUserFriends)

/*UPDATE USER FRIENDS */
userRouter.patch('/:id/:friendId',verifyToken, addRemoveFriend)

export default userRouter