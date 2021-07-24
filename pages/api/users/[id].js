import nc from '../../../middleware/nextConnect'
import User from '../../../models/userSchema'
import dbConnect from '../../../middleware/dbConnect'

const handler = nc.use(dbConnect).get(async (req, res) => {
	const { id } = req.query

	const user = await User.findById(id)
	if (!user) {
		res.status(404).json({
			status: 404,
			message: 'User not found',
		})
	} else {
		res.status(200).json({
			success: true,
			user,
		})
	}
})

export default handler
