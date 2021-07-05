import jwt from 'jsonwebtoken'
import Cookies from 'cookies'
import { promisify } from 'util'
import User from '../models/userSchema'

export const signToken = (id) =>
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

export const checkHeaders = async (req) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1]
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt
	}

	if (!token) {
		return {
			error: true,
			status: 401,
			message: 'You are not logged in. Please log in for access',
		}
	}

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
	const currentUser = await User.findById(decoded.id)
	if (!currentUser) {
		return {
			error: true,
			status: 401,
			message: 'The user belonging to this token no longer exists',
		}
	}

	if (currentUser.changedPasswordAfter(decoded.iat)) {
		return {
			error: true,
			status: 401,
			message: 'User recently changed password. Please log in again.',
		}
	}

	return currentUser
}

export const protect = async (req, res) => {
	const authUser = await checkHeaders(req)

	if (authUser.error) {
		res.status(authUser.status).json({
			success: false,
			message: authUser.message,
		})
		return null
	} else {
		return authUser
	}
}

const authToken = {
	signToken,
	createAndSendToken,
	protect,
	checkHeaders,
}

export default authToken
