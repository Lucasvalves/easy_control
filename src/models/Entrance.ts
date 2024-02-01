import mongoose from 'mongoose'
//const mongoosePaginate = require('mongoose-paginate')
import { v4 as uuid } from 'uuid'

const EntranceSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: uuid(),
	},
	sale: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Sale',
	},

	value: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

//EntranceSchema.plugin(mongoosePaginate)
const Entrance = mongoose.model('Entrance', EntranceSchema)

export { Entrance }
