import { dbConnectMiddleware } from '../../utils/dbConnect'
import Image from '../../models/imageSchema'
import nc from 'next-connect'
import { protect, restrict } from '../../middleware/authMiddleware'
import ncOptions from '../../utils/ncUtils'

const handler = nc(ncOptions)
	.use(dbConnectMiddleware)
	.get(async (req, res) => {
		const images = await Image.find()

		if (!images) {
			return res.status(404).json({
				success: false,
				message: 'No images found in database',
			})
		} else
			return res.status(200).json({
				success: true,
				images,
			})
	})

export default handler
