import { dbConnectMiddleware } from '../../../utils/dbConnect'
import Image from '../../../models/imageSchema'
import nc from 'next-connect'
import { protect, restrict } from '../../../middleware/authMiddleware'
import ncOptions from '../../../utils/ncUtils'
import fs from 'fs'
import path from 'path'

const handler = nc(ncOptions)
	.use(dbConnectMiddleware)
	.use(protect)
	.use(restrict('admin'))
	.delete(async (req, res) => {
		const img = await Image.findById(req.query.id)
		if (img) {
			await Image.findByIdAndDelete(req.query.id)

			fs.unlink(path.join('./public/img', img.name), err => {
				if (err) console.error(err)
			})

			res.status(204).json({
				success: true,
				data: null,
				message: 'data successfully deleted',
			})
		} else {
			res.status(404).json({
				success: false,
				message: 'image not found',
			})
		}
	})

export default handler
