import nc from 'next-connect'
import dbConnect from '../../../middleware/dbConnect'
import authToken from '../../../utils/authToken'
import User from '../../../models/userSchema'
import ncOptions from '../../../utils/ncUtils'
import Email from '../../../utils/email'

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
