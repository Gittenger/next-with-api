import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/userSchema'
import authToken from '../../../utils/authToken'

const { createAndSendToken } = authToken

export default async function handler(req, res) {
	const {
		query,
		method,
		body: { email, password },
	} = req

	await dbConnect()

	switch (method) {
		case 'POST':
			if (!email | !password) {
				res.status(400).json({
					success: false,
					message: 'Email and password required.',
				})
			}

			const user = await User.findOne({ email }).select('+password')

			if (!user | !(await user.correctPassword(password, user.password))) {
				res.status(401).json({
					success: false,
					message: 'Incorrect email or password',
				})
			}

			createAndSendToken(user, 200, req, res)
			break

		default:
			break
	}
}
