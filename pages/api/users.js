import User from '../../models/userSchema'
import dbConnect from '../../utils/dbConnect'

export default async function handler(req, res) {
	const { method } = req

	await dbConnect()

	switch (method) {
		case 'GET':
			try {
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
