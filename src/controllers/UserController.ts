import { Request, Response, NextFunction } from 'express'
import { UserRepository } from '../repositories/UserRepository'
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

class UserController {
	private userRepository: UserRepository

	constructor() {
		this.userRepository = new UserRepository()
	}

	async store(request: Request, response: Response, next: NextFunction) {
		const { name, email, password } = request.body

		try {
			const findUser = await this.userRepository.finByEmail(email)
			if (findUser) {
				throw new Error('User Exists')
			}
			const hashPassowrd = await hash(password, 10)

			const createUser = await this.userRepository.store({
				name,
				email,
				password: hashPassowrd,
			})

			return response.status(201).json(createUser)
		} catch (error) {
			next(error)
		}
	}
	async auth(request: Request, response: Response, next: NextFunction) {
		const { email, password } = request.body

		try {
			const findUser = await this.userRepository.finByEmail(email)

			if (!findUser) {
				throw new Error('User or password invalid')
			}
			const passwordMatch = await compare(password, findUser.password)
			if (!passwordMatch) {
				throw new Error('User or password invalid')
			}

			const scretKey: string | undefined = process.env.ACCESS_KEY_TOKEN

			if (!scretKey) {
				throw new Error('There is no token key')
			}

			const token = sign({ email }, scretKey, {
				subject: findUser.id,
				expiresIn: '365d',
				//expiresIn: 60 * 15,
			})

			return response.json({
				token,
				user: {
					name: findUser?.name,
					email: findUser.email,
				},
			})
		} catch (error) {
			next(error)
		}
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const { user_id } = request
		const { name, password, oldPassword } = request.body

		try {
			const findUser = await this.userRepository.finById(user_id)

			if (!findUser) {
				throw new Error('User not found')
			}
			if (password && oldPassword && findUser.password) {
				const passwordMatch = await compare(oldPassword, findUser.password)
				if (!passwordMatch) {
					throw new Error('Password doesn`t match')
				}
				const hashPassowrd = await hash(password, 10)

				await this.userRepository.updatePassword(user_id, hashPassowrd)
			}
			if (name) {
				if (findUser.name == name) {
					throw new Error('Name is the same')
				}
				await this.userRepository.updateName(user_id, name)
			}
			return response.json({ message: 'Update successflly' })
		} catch (error) {
			next(error)
		}
	}

	async getAll(request: Request, response: Response, next: NextFunction) {
		try {
			const result = await this.userRepository.getAll()
			return response.json(result)
		} catch (error) {
			next(error)
		}
	}
	async show(request: Request, response: Response, next: NextFunction) {
		const {id} = request.params

		const findUser = await this.userRepository.finById(id)

		if (!findUser) {
			throw new Error('User not found')
		}
		try {
			const result = await this.userRepository.show(id)
			return response.json(result)
		} catch (error) {
			next(error)
		}
	}
	async delete(request: Request, response: Response, next: NextFunction) {
		const { id } = request.params
		console.log(id)

		try {
			const findUser = await this.userRepository.finById(id)
			if (!findUser) {
				throw new Error('User not found')
			}
			const result = await this.userRepository.delete(id)
			console.log(result)

			return response.json(result)
		} catch (error) {
			next(error)
		}
	}
}
export { UserController }
