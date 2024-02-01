import mongoose from 'mongoose'
//const mongoosePaginate = require("mongoose-paginate");
import { v4 as uuid } from 'uuid'
const SaleSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: uuid(),
	},
	sale: {
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				quantity: Number,
				price: Number,
			},
		],
		descount: Number,
		total: Number,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
})

//SaleSchema.plugin(mongoosePaginate);
//module.exports = mongoose.model("Sale", SaleSchema);

const Sale = mongoose.model('Sale', SaleSchema)

export { Sale }
