import mongoose from 'mongoose'
import { v4 as uuid } from 'uuid'


const CategorySchema = new mongoose.Schema({
	_id: {
		type: String,
		default: uuid(),
	},
	name: {
		type: String,
		required: true,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
})


//module.exports = mongoose.model('Category', CategorySchema)
const Exit =  mongoose.model('Category', CategorySchema)

export { Exit }
