import User from '../../../models/userSchema'
import dbConnect from '../../../utils/dbConnect'
import authToken from '../../../utils/authToken'

const { checkHeaders } = authToken

export default async function handler(req, res) {
	const { query, method } = req
	await dbConnect()

	switch (method) {
		case 'DELETE':
			try {
				const user = await checkHeaders(req)
				await User.findByIdAndUpdate(user.id, { active: false })

				res.status(204).json({
					success: true,
					data: null,
				})
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
	}
}
