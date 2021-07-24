import nc from 'next-connect'
import User from '../../models/userSchema'
import { dbConnectMiddleware } from '../../utils/dbConnect'
import { protect } from '../../middleware/authMiddleware'
import ncOptions from '../../utils/ncUtils'

const handler = nc(ncOptions)
	.use(dbConnectMiddleware)
	.use(protect)
	.get(async (req, res) => {
		const users = await User.find()

		res.status(200).json({
			success: true,
			users,
		})
	})

export default handler
