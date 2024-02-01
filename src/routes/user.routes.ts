import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { AuthMiddleware } from '../middleware/AuthMiddleware'

class UserRoutes {
	private router: Router
	private userController: UserController
	private authMiddleware: AuthMiddleware

	constructor() {
		this.router = Router()
		this.userController = new UserController()
		this.authMiddleware = new AuthMiddleware()
	}

	getRoutes(): Router {
		this.router.post('/', this.userController.store.bind(this.userController)),
		this.router.put(
			'/',
			this.authMiddleware.auth.bind(this.authMiddleware),
			this.userController.update.bind(this.userController)
		)

		this.router.post(
			'/auth',
			this.userController.auth.bind(this.userController)
		)
		this.router.get(
			'/',
			this.authMiddleware.auth.bind(this.authMiddleware),
			this.userController.getAll.bind(this.userController)
		)
		this.router.get(
			'/:id',
			this.authMiddleware.auth.bind(this.authMiddleware),
			this.userController.show.bind(this.userController)
		)

		this.router.delete(
			'/:id',
			this.authMiddleware.auth.bind(this.authMiddleware),
			this.userController.delete.bind(this.userController)
		)
		return this.router
	}
}

export { UserRoutes }
