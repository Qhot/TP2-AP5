import {
  Request,
  Response,
  Router,
} from 'express'

import OrderService from './orders.service'
import OrderProxy from './oders.proxy'
import IService from './services.interface'

export default class OrdersController {
  public path = '/orders'
  public pathId = '/orders/:id'
  public router = Router()
  public orderService: IService = new OrderProxy(new OrderService())

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAll)
    this.router.get(this.pathId, this.getById)
    this.router.post(this.path, this.create)
    this.router.delete(this.path, this.deleteAll)
    this.router.delete(this.pathId, this.delete)
    this.router.put(this.pathId, this.update)
  }

  public getAll = async (request: Request, response: Response) => {
    // returns the orders
    return response.json(await this.orderService.getAll())
  }

  public getById = async (request: Request, response: Response) => {
    // returns the order or 404
    const result = await this.orderService.getById(Number(request.params.id))
    if (result === null) {
      response.sendStatus(404)
    } else {
      response.json(result)
    }
  }

  public create = async (request: Request, response: Response) => {
    // returns the orderToSave
    return response.json(await this.orderService.create(request.body))
  }

  public delete = async (request: Request, response: Response) => {
    // returns 204 for success or 404
    const result = await this.orderService.delete(Number(request.params.id))
    if (result === null) {
      response.sendStatus(404)
    } else {
      response.sendStatus(200)
    }
  }

  public deleteAll = async (request: Request, response: Response) => {
    // returns 204
    const result = await this.orderService.deleteAll()
    if (result) {
      response.sendStatus(200)
    }
  }

  public update = async (request: Request, response: Response) => {
    // returns 204
    const result = await this.orderService.update(Number(request.params.id), request.body)
    if (result) {
      response.sendStatus(202)
    }
  }
}
