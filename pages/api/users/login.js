import nc from '../../../middleware/nextConnect'
import dbConnect from '../../../middleware/dbConnect'
import User from '../../../models/userSchema'
import authToken from '../../../utils/authToken'

const { createAndSendToken } = authToken

const handler = nc(ncOptions)
	.use(dbConnect)
	.post(async (req, res) => {
		const { email, password } = req.body

		if (!email || !password) {
			res.status(400).json({
				success: false,
				message: 'Email and password required.',
			})
		}

		const user = await User.findOne({ email }).select('+password')

		if (!user || !(await user.correctPassword(password, user.password))) {
			res.status(401).json({
				success: false,
				message: 'Incorrect email or password',
			})
		} else createAndSendToken(user, 200, req, res)
	})

export default handler
