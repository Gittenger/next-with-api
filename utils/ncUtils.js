export function onNoMatch(req, res) {
	res.status(405).json({
		success: false,
		message: `Method ${req.method} not allowed. Please try again`,
	})
}

export function onError(err, req, res, next) {
	res.status(500).end(err.toString())
}

export const ncOptions = {
	onNoMatch,
	onError,
}

export default ncOptions
