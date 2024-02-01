import mongoose from 'mongoose'
//const mongoosePaginate = require('mongoose-paginate')
import { v4 as uuid } from 'uuid'

const ExitSchema = new mongoose.Schema({
	descriptionExit: String,
	_id: {
		type: String,
		default: uuid(),
	},
	value: {
		type: Number,
		required: true,
	},

	date: {
		type: Date,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
})

//ExitSchema.plugin(mongoosePaginate)

const Exit = mongoose.model('Exit', ExitSchema)

export { Exit }
