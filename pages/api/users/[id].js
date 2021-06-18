export default (req, res) => {
	const {
		query: { id },
	} = req

	const user = (() => (id === '1' || id === '2' ? id : null))()

	if (!user) {
		return res.status(404).json({
			status: 404,
			message: 'Not Found',
		})
	}

	res.status(200).json({ user: { id, name: 'Test user' } })
}
