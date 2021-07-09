import Image from '../../../models/imageSchema'
import nc from 'next-connect'
import { dbConnectMiddleware } from '../../../utils/dbConnect'
import ncOptions from '../../../utils/ncUtils'

const handler = nc(ncOptions)
	.use(dbConnectMiddleware)
	.use(protect)
	.delete(async (req, res) => {
		await Image.deleteMany()

		res.status(204).json({
			success: true,
			data: null,
			message: 'data successfully deleted',
		})
	})

export default handler
