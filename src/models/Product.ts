import mongoose from 'mongoose'
//import mongoosePaginate from 'mongoose-paginate'
import { v4 as uuid } from 'uuid'

const ProductSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: uuid(),
	},
	barcode: {
		type: String,
	},

	name: {
		type: String,
		required: true,
	},

	amount: {
		type: Number,
		required: true,
	},

	salePrice: {
		type: Number,
		required: true,
	},

	expirationDate: {
		type: Date,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
})

//ProductSchema.plugin(mongoosePaginate)
//module.exports = mongoose.model('Product', ProductSchema)
const Product = mongoose.model('Product', ProductSchema)

export { Product }
