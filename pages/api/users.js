import User from '../../models/userSchema'
import dbConnect from '../../utils/dbConnect'
import authToken from '../../utils/authToken'

const { protect } = authToken

export default async function handler(req, res) {
	const { method } = req

	await dbConnect()

	switch (method) {
		case 'GET':
			try {
				const authUser = await protect(req, res)

				if (authUser.role !== 'admin') {
					return res.status(403).json({
						success: false,
						message: 'You do not have permission to perform this action',
					})
				}
				const users = await User.find()

				res.status(200).json({
					success: true,
					users,
				})
			} catch (err) {
				res.status(400).json({
					success: false,
					err,
				})
			}
			break
		default:
			res.status(400).json({ success: false })
			break
	}
}
