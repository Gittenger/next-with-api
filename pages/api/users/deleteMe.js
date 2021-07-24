import nc from 'next-connect'
import User from '../../../models/userSchema'
import dbConnect from '../../../middleware/dbConnect'
import { protect } from '../../../middleware/authMiddleware'
import ncOptions from '../../../utils/ncUtils'

const handler = nc(ncOptions)
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
