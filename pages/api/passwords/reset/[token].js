import nc from '../../../../middleware/nextConnect'
import dbConnect from '../../../../middleware/dbConnect'
import User from '../../../../models/userSchema'
import authToken from '../../../../utils/server/authToken'
import crypto from 'crypto'

const { createAndSendToken } = authToken

const handler = nc.use(dbConnect).patch(async (req, res) => {
	const hashedToken = crypto
		.createHash('sha256')
		.update(req.query.token)
		.digest('hex')

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	})

	if (!user) {
		return res.status(400).json({
			success: false,
			message: 'token is invalid or expired.',
		})
	}

	user.password = req.body.password
	user.passwordConfirm = req.body.passwordConfirm
	user.passwordResetToken = undefined
	user.passwordResetExpires = undefined

	await user.save()

	createAndSendToken(user, 200, req, res)
})

export default handler
