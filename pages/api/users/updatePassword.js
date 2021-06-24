import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/userSchema'
import authToken from '../../../utils/authToken'

const { createAndSendToken, checkHeaders } = authToken

export default async function handler(req, res) {
	const {
		query,
		method,
		body: { password, passwordConfirm, currentPassword },
	} = req

	await dbConnect()

	switch (method) {
		case 'PATCH':
			const authUser = await checkHeaders(req)
			if (authUser.error) {
				res.status(authUser.status).json({
					success: false,
					message: authUser.message,
				})
			} else {
				try {
					const user = await User.findById(authUser).select('+password')

					if (!user.correctPassword(currentPassword, user.password)) {
						res.status(401).json({
							success: false,
							message: 'Incorrect password provided. Please try again.',
						})
					}
					user.password = password
					user.passwordConfirm = passwordConfirm
					console.log(user.password, user.passwordConfirm)
					await user.save()

					createAndSendToken(user, 200, req, res)
				} catch (err) {
					console.log(err)
					res.status(400).json({
						success: false,
						err,
					})
				}
			}

			break

		default:
			res.status(400).json({
				success: false,
			})
			break
	}
}
