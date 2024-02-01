import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

let mongodbUri: string
process.env.DB_URL !== undefined
	? (mongodbUri = process.env.DB_URL)
	: console.error('Environment variable is not defined.')

class DbConnection {
	async connect() {
		try {
			await mongoose.connect(mongodbUri)
			console.log('Connect to database')
		} catch (error) {
			console.log('Error to connect')
		}
	}
}
export { DbConnection }
