import nc from 'next-connect'
import { dbConnectMiddleware } from '../../../utils/dbConnect'
import User from '../../../models/userSchema'
import { protect } from '../../../utils/authMiddleware'
import authToken from '../../../utils/authToken'
import ncOptions from '../../../utils/ncUtils'

const { createAndSendToken } = authToken

const handler = nc(ncOptions)
	.use(dbConnectMiddleware)
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