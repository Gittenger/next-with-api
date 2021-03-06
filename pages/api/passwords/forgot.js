import User from '../../../models/userSchema'
import nc from '../../../middleware/nextConnect'
import dbConnect from '../../../middleware/dbConnect'
import Email from '../../../utils/server/email'

const handler = nc.use(dbConnect).post(async (req, res) => {
	const user = await User.findOne({ email: req.body.email })
	if (!user) {
		return res.status(404).json({
			success: false,
			message: 'No user found with that email',
		})
	}

	const resetToken = user.createPasswordResetToken()

	await user.save({ validateBeforeSave: false })

	try {
		const resetUrl = `http://localhost:3000/api/passwords/reset/${resetToken}`

		await new Email(user, resetUrl).sendPasswordReset()

		res.status(200).json({
			success: true,
			message: 'Password reset link sent to email',
		})
	} catch (err) {
		user.passwordResetToken = undefined
		user.passwordResetExpires = undefined

		await user.save({ validateBeforeSave: false })
		return res.status(500).json({
			success: false,
			message: 'There was an error sending the email. Try again later',
		})
	}
})

export default handler
