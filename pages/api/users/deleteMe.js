import nc from '../../../middleware/nextConnect'
import User from '../../../models/userSchema'
import dbConnect from '../../../middleware/dbConnect'
import { protect } from '../../../middleware/authMiddleware'

const handler = nc
	.use(dbConnect)
	.use(protect)
	.delete(async (req, res) => {
		await User.findByIdAndUpdate(req.user.id, { active: false })

		res.status(204).json({
			success: true,
			data: null,
			message: 'User deleted',
		})
	})

export default handler
