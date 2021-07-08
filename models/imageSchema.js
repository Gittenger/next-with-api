const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
	name: {
		type: String,
		default: 'default.jpg',
	},
})

module.exports = mongoose.models.Image || mongoose.model('Image', imageSchema)
