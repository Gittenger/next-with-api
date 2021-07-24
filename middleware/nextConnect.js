import nextConnect from 'next-connect'

function onNoMatch(req, res) {
	res.status(405).json({
		success: false,
		message: `Method ${req.method} not allowed. Please try again`,
	})
}

function onError(err, req, res, next) {
	res.status(500).end(err.toString())
}

const ncOptions = {
	onNoMatch,
	onError,
}

const nc = nextConnect(ncOptions)

export default nc
