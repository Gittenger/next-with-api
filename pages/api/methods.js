export default (req, res) => {
	const { method } = req

	switch (method) {
		case 'GET':
			res.status(200).json({
				method: 'GET',
			})
			break
		case 'POST':
			res.status(200).json({
				method: 'POST',
			})
			break

		default:
			res.setHeader('Allow', ['GET', 'POST'])
			res.status(405).end(`Method ${method} not allowed.`)
			break
	}
}
