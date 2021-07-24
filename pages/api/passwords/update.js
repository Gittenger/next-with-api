import nc from '../../../middleware/nextConnect'
import dbConnect from '../../../middleware/dbConnect'
import User from '../../../models/userSchema'
import { protect } from '../../../middleware/authMiddleware'
import authToken from '../../../utils/server/authToken'

const { createAndSendToken } = authToken

const handler = nc
	.use(dbConnect)
	.use(protect)
	.patch(async (req, res) => {
		const { password, passwordConfirm, currentPassword } = req.body

		const user = await User.findById(req.user.id).select('+password')

		if (!user.correctPassword(currentPassword, user.password)) {
			res.status(401).json({
				success: false,
				message: 'Incorrect password provided. Please try again.',
			})
		} else {
			user.password = password
			user.passwordConfirm = passwordConfirm
			await user.save()

			createAndSendToken(user, 200, req, res)
		}
	})

export default handler
