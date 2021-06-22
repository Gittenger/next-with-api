import dbConnect from '../../../utils/dbConnect'
import Cookies from 'cookies'

export default async function handler(req, res) {
	const { query, method } = req

	await dbConnect()

	switch (method) {
		case 'POST':
			const cookies = new Cookies(req, res)
			cookies.set('jwt', 'logged_out', {
				expires: new Date(Date.now() + 10 * 1000),
				httpOnly: true,
			})

			res.status(200).json({
				success: true,
			})
			break

		default:
			break
	}
}
