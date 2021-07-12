import Image from '../../../models/imageSchema'
import nc from 'next-connect'
import { dbConnectMiddleware } from '../../../utils/dbConnect'
import { protect, restrict } from '../../../utils/authMiddleware'
import ncOptions from '../../../utils/ncUtils'

const handler = nc(ncOptions)
	.use(dbConnectMiddleware)
	.use(protect)
	.use(restrict('admin'))
	.delete(async (req, res) => {
		await Image.deleteMany()

		res.status(204).json({
			success: true,
			data: null,
			message: 'data successfully deleted',
		})
	})

export default handler
