import nc from 'next-connect'
import { dbConnectMiddleware } from '../../../utils/dbConnect'
import multer from 'multer'
import Image from '../../../models/imageSchema'
import { protect, restrict } from '../../../utils/authMiddleware'
import ncOptions from '../../../utils/ncUtils'

const storage = multer.diskStorage({
	// first param of cb's is error
	destination: (req, file, cb) => {
		cb(null, './public/img')
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split('/')[1]
		cb(null, `${Date.now()}.${ext}`)
	},
})

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true)
	} else {
		cb(Error('Selected file must be an image'), false)
	}
}

const multerOptions = {
	storage,
	fileFilter,
}

const uploadMiddleware = multer(multerOptions).single('image')

const handler = nc(ncOptions)
	.use(dbConnectMiddleware)
	.use(protect)
	.use(restrict('admin'))
	.use(uploadMiddleware)
	.post(async (req, res) => {
		const img = await Image.create({ name: `${req.file.filename}` })

		res.status(200).json({
			success: true,
			img: `http://localhost:3000/img/${img.name}`,
		})
	})

export default handler

export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
}
