import express, { Request, Response, Application } from 'express'
import { UserRoutes } from './routes/user.routes'
import { DbConnection } from './database'

const app: Application = express()

app.use(express.json()) //sempre que precisar passar algo para todas as rotas é no use
app.use(express.urlencoded({ extended: true })) //para deixar a url mais legivel, sem espaços

const userRoutes = new UserRoutes().getRoutes()
app.use('/user', userRoutes)

const database = new DbConnection()
database.connect()

app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof Error) {
			return response.status(400).json({
				message: err.message,
			})
		}
		return response.status(500).json({
			message: 'Internal Server Error',
		})
	}
)

app.listen(3333, () => console.log('server is running'))
