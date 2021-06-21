import User from '../../../models/userSchema'
import dbConnect from '../../../utils/dbConnect'

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req

	await dbConnect()

	switch (method) {
		case 'GET':
			try {
				const user = await User.findById(id)

				if (!user) {
					return res.status(404).json({
						status: 404,
						message: 'Not Found',
					})
				}
				res.status(200).json({ user })
			} catch (err) {
				res.status(400).json({ success: false, err })
			}
			break

		default:
			res.status(400).json({ success: false })
			break
	}
}
