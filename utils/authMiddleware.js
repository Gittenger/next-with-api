import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import User from '../models/userSchema'

export const protect = async (req, res, next) => {
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
		return res.status(401).json({
			success: false,
			message: 'You are not logged in. Please log in for access',
		})
	}

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
	const currentUser = await User.findById(decoded.id)
	if (!currentUser) {
		return res.status(401).json({
			success: false,
			message: 'The user belonging to this token no longer exists',
		})
	}

	if (currentUser.changedPasswordAfter(decoded.iat)) {
		return res.status(401).json({
			success: false,
			message: 'User recently changed password. Please log in again.',
		})
	}

	req.user = currentUser
	next()
}

export const restrict = (...roles) => (req, res, next) => {
	if (!roles.includes(req.user.role)) {
		return res.status(403).json({
			success: false,
			message: "You don't have permission to perform this action",
		})
	} else next()
}
