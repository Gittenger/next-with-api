import nc from 'next-connect'
import User from '../../../models/userSchema'
import { dbConnectMiddleware } from '../../../utils/dbConnect'
import ncOptions from '../../../utils/ncUtils'

const handler = nc(ncOptions)
	.use(dbConnectMiddleware)
	.get(async (req, res) => {
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
