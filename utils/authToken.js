import jwt from 'jsonwebtoken'
import Cookies from 'cookies'

export const signToken = id =>
	jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN | 0,
	})

export const createAndSendToken = (user, statusCode, req, res) => {
	const token = signToken(user._id)
	const cookies = new Cookies(req, res)
	const cookieOptions = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000),
		httpOnly: true,
	}

	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true
	cookies.set('jwt', token, cookieOptions)

	user.password = undefined

	const { id, role, name, email } = user

	res.status(statusCode).json({
		success: true,
		token,
		user: {
			id,
			role,
			name,
			email,
		},
	})
}

const authToken = {
	signToken,
	createAndSendToken,
}

export default authToken
