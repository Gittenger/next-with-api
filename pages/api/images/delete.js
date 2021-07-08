import Image from '../../../models/imageSchema'
import nc from 'next-connect'
import { dbConnectMiddleware } from '../../../utils/dbConnect'
import { protect } from '../../../utils/authMiddleware'

function onNoMatch(req, res) {
	res.status(405).json({
		success: false,
		message: `Method ${req.method} not allowed`,
	})
}

function onError(err, req, res, next) {
	res.status(500).end(err.toString())
}

const ncOptions = {
	onNoMatch,
	onError,
}

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
