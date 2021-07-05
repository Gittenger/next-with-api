import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/userSchema'
import authToken from '../../../utils/authToken'

const { createAndSendToken, checkHeaders, protect } = authToken

export default async function handler(req, res) {
	const {
		query,
		method,
		body: { password, passwordConfirm, currentPassword },
	} = req

	await dbConnect()

	switch (method) {
		case 'PATCH':
			try {
				const authUser = await protect(req, res)
				if (authUser) {
					const user = await User.findById(authUser).select('+password')

					if (!user.correctPassword(currentPassword, user.password)) {
						res.status(401).json({
							success: false,
							message: 'Incorrect password provided. Please try again.',
						})
					}
					user.password = password
					user.passwordConfirm = passwordConfirm
					await user.save()

					createAndSendToken(user, 200, req, res)
				}
			} catch (err) {
				res.status(400).json({
					success: false,
					err,
				})
			}
			break

		default:
			res.status(400).json({
				success: false,
			})
			break
	}
}
