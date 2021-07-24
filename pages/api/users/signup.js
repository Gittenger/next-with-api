import nc from '../../../middleware/nextConnect'
import dbConnect from '../../../middleware/dbConnect'
import authToken from '../../../utils/server/authToken'
import User from '../../../models/userSchema'
import Email from '../../../utils/server/email'

const { createAndSendToken } = authToken

const handler = nc(ncOptions)
	.use(dbConnect)
	.post(async (req, res) => {
		const { name, email, password, passwordConfirm } = req.body

		const user = await User.create({
			name,
			email,
			password,
			passwordConfirm,
		})

		await new Email(user, 'https://wwww.google.com').sendWelcome()

		createAndSendToken(user, 200, req, res)
	})

export default handler
