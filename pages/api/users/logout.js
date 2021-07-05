import dbConnect from '../../../utils/dbConnect'
import Cookies from 'cookies'

export default async function handler(req, res) {
	const { query, method } = req

	await dbConnect()

	switch (method) {
		case 'POST':
			try {
				const cookies = new Cookies(req, res)
				cookies.set('jwt', 'logged_out', {
					expires: new Date(Date.now() + 10 * 1000),
					httpOnly: true,
				})

				res.status(200).json({
					success: true,
				})
			} catch (err) {
				res.status(500).json({
					success: false,
					err,
				})
			}
			break

		default:
			res.status(400).json({
				success: false,
			})
			break
	}
}
