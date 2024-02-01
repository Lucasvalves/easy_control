import { ICreate } from '../interfaces/UserInterface'
import { User } from '../models/User'

class UserRepository {
	async finByEmail(email: string) {
		const result = await User.findOne({ email })
		return result
	}

	async store({ name, email, password }: ICreate) {
		const result = await User.create({ name, email, password })

		//const findUser = await User.findOne({ email })

		return result
	}
	async finById(id: string) {
		const result = await User.findById(id)
		return result
	}
	async updatePassword(id: string, password: string) {
		const result = await User.findById(id).updateOne({ password })
		return result
	}
	async updateName(id: string, name: string) {
		const result = await User.findById(id).updateOne({ name })
		return result
	}
	async getAll(){
		const result = await User.find()

		return result
	}	async show(id:string){
		const result = await User.findById(id)

		return result
	}
	async delete(id:string){
		const deleteUser = await User.findByIdAndDelete(id)
		return deleteUser
	}
}
export { UserRepository }
