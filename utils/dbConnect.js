import mongoose from 'mongoose'

const URI = process.env.DB_CONNECTION.replace(
	/<PASSWORD>/,
	process.env.DB_PW
).replace(/<DB_NAME>/, process.env.DB_NAME)

if (!URI) {
	throw new Error(
		'Please define the MONGODB environment variables inside .env.local'
	)
}

let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
	if (cached.conn) return cached.conn

	if (!cached.promise) {
		const options = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			bufferCommands: false,
			bufferMaxEntries: 0,
			useFindAndModify: false,
			useCreateIndex: true,
		}

		cached.promise = mongoose.connect(URI, options).then(client => {
			return client
		})
	}
	cached.conn = await cached.promise
	return cached.conn
}

export default dbConnect
