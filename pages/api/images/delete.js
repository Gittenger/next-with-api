import Image from '../../../models/imageSchema'
import nc from '../../../middleware/nextConnect'
import dbConnect from '../../../middleware/dbConnect'
import { protect, restrict } from '../../../middleware/authMiddleware'
import fs from 'fs'
import path from 'path'

const handler = nc(ncOptions)
	.use(dbConnect)
	.use(protect)
	.use(restrict('admin'))
	.delete(async (req, res) => {
		await Image.deleteMany()

		fs.readdir('./public/img', (err, files) => {
			if (!err) {
				files.forEach(file => {
					fs.unlink(path.join('./public/img', file), err => {
						if (err) console.error(err)
					})
				})
			} else console.error(err)
		})

		res.status(204).json({
			success: true,
			data: null,
			message: 'data successfully deleted',
		})
	})

export default handler
