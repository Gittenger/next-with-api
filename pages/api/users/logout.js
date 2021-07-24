import nc from '../../../middleware/nextConnect'
import Cookies from 'cookies'

const handler = nc.post((req, res) => {
	const cookies = new Cookies(req, res)
	cookies.set('jwt', 'logged_out', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	})
	res.status(200).json({
		success: true,
		message: 'logged out',
	})
})

export default handler
