import IOrder from './orders.interface'
import IService from './services.interface'
import Order from './orders.model'

export default class OrderService implements IService {

    public orderModel = new Order('orders')

    public getAll = async () => {
        const raw: string = await this.orderModel.getData()
        const orders: IOrder[] | [] = JSON.parse(raw) || []
        return orders
    }

    public getById = async (id: number) => {
        const rawOrders: string = await this.orderModel.getData()
        const orders: IOrder[] | [] = JSON.parse(rawOrders) || []

        // tslint:disable-next-line: triple-equals
        const foundOrder: IOrder = orders.find((order) => order.id == id)

        if (!foundOrder) {
            return null
        }

        return foundOrder
    }

    public create = async (orderInformations: any) => {
        const rawOrders: string = await this.orderModel.getData()
        const orders: IOrder[] | [] = JSON.parse(rawOrders) || []

        const sortedOrders: IOrder[] | [] = orders.sort((previous: any, current: any) => {
            return current.id - previous.id
        })
        // tslint:disable-next-line: radix
        const lastId: number = sortedOrders.length > 0 ? sortedOrders[0].id : 0

        // Generate automatic data
        const orderToSave: IOrder = {
            ...orderInformations,
            id: lastId + 1,
            createdAt: new Date(),
        }

        const newOrders: IOrder[] = [...orders, orderToSave]
        await this.orderModel.setData(newOrders)

        return orderToSave
    }

    public delete = async (id: number) => {
        const rawOrders: string = await this.orderModel.getData()
        const orders: IOrder[] | [] = JSON.parse(rawOrders) || []
        // tslint:disable-next-line: triple-equals
        const orderToDelete: IOrder | null = orders.find((order) => order.id == id)

        if (!orderToDelete) {
            return false
        }

        const newOrders: IOrder[] = orders.filter((order) => order.id !== orderToDelete.id)
        await this.orderModel.setData(newOrders)

        return true
    }

    public deleteAll = async () => {
        await this.orderModel.delAllData()
        return true
    }

    public update = async (id: number, updateInformations: any) => {
        const rawOrders: string = await this.orderModel.getData()
        const orders = JSON.parse(rawOrders) || []
        // tslint:disable-next-line: triple-equals
        const orderToUpdate = orders.find((order: any) => order.id == id)

        if (!orderToUpdate) {
            return false
        }

        const updated = {
            ...orderToUpdate,
            ...updateInformations,
        }

        // tslint:disable-next-line: triple-equals
        const newOrders = orders.map((order: any) => order.id == updated.id ? updated : order)

        await this.orderModel.setData(newOrders)

        return true
    }
}
