import nc from 'next-connect'
import { dbConnectMiddleware } from '../../../utils/dbConnect'
import authToken from '../../../utils/authToken'
import User from '../../../models/userSchema'
import ncOptions from '../../../utils/ncUtils'

const { createAndSendToken } = authToken

const handler = nc(ncOptions)
	.use(dbConnectMiddleware)
	.post(async (req, res) => {
		const { name, email, password, passwordConfirm } = req.body

		const user = await User.create({
			name,
			email,
			password,
			passwordConfirm,
		})

		createAndSendToken(user, 200, req, res)
	})

export default handler
