import dbConnect from '../../../utils/dbConnect'
import authToken from '../../../utils/authToken'
import User from '../../../models/userSchema'

const { createAndSendToken } = authToken

export default async function handler(req, res) {
	const {
		query,
		method,
		body: { name, email, password, passwordConfirm },
	} = req

	await dbConnect()

	switch (method) {
		case 'POST':
			try {
				const user = await User.create({
					name,
					email,
					password,
					passwordConfirm,
				})

				createAndSendToken(user, 200, req, res)
			} catch (err) {
				res.status(500).json({
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
