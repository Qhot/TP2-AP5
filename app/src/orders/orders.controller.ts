import {
  Request,
  Response,
  Router,
} from 'express'

import {
  delAsync,
  getAsync,
  setAsync,
} from '../../utils/storage'

import IOrder from './orders.interface'

export default class OrdersController {
  public path = '/orders'
  public pathId = '/orders/:id'
  public router = Router()

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
    response.json(JSON.parse(await getAsync('orders')) || [])
  }

  public getById = async (request: Request, response: Response) => {
    const id = Number(request.params.id)

    const rawOrders: string = await getAsync('orders')
    const orders: IOrder[] = JSON.parse(rawOrders) || []

    // tslint:disable-next-line: triple-equals
    const foundOrder: IOrder = orders.find((order) => order.id == id)

    if (!foundOrder) {
      return response.sendStatus(404)
    }

    response.json(foundOrder)
  }

  public create = async (request: Request, response: Response) => {
    let orderToSave = request.body
    const rawOrders: string = await getAsync('orders')
    const orders: IOrder[] = JSON.parse(rawOrders) || []

    const sortedOrders = orders.sort((previous: any, current: any) => {
      return current.id - previous.id
    })
    const lastId = sortedOrders.length > 0 ? sortedOrders[0].id : 0

    // Generate automatic data
    orderToSave = {
      ...orderToSave,
      id: lastId + 1,
      createdAt: new Date(),
    }

    orders.push(orderToSave)
    await setAsync('orders', JSON.stringify(orders))

    response.status(201).json(orderToSave)
  }

  public delete = async (request: Request, response: Response) => {
    const id = Number(request.params.id)

    const rawOrders: string = await getAsync('orders')
    const orders: IOrder[] = JSON.parse(rawOrders) || []
    // tslint:disable-next-line: triple-equals
    const orderToDelete: IOrder = orders.find((order) => order.id == id)

    if (!orderToDelete) {
      return response.sendStatus(404)
    }

    const newOrders: IOrder[] = orders.filter((order) => order.id !== orderToDelete.id)
    await setAsync('orders', JSON.stringify(newOrders))

    response.sendStatus(204)
  }

  public deleteAll = async (request: Request, response: Response) => {
    await delAsync('orders')
    response.sendStatus(204)
  }

  public update = async (request: Request, response: Response) => {
    const updateInformations: any = request.body
    const id = Number(request.params.id)

    const rawOrders: string = await getAsync('orders')
    const orders: IOrder[] = JSON.parse(rawOrders) || []
    // tslint:disable-next-line: triple-equals
    const orderToUpdate = orders.find((order: any) => order.id == id)

    if (!orderToUpdate) {
      return response.sendStatus(404)
    }

    const updated = {
      ...orderToUpdate,
      ...updateInformations,
    }

    // tslint:disable-next-line: triple-equals
    const newOrders = orders.map((order: any) => order.id == updated.id ? updated : order)

    await setAsync('orders', JSON.stringify(newOrders))

    response.sendStatus(204)
  }
}
