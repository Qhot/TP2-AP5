import Order from './orders.interface'
import IService from './services.interface'

export default class OrderProxy implements IService {

    private service: IService

    constructor(service: IService) {
        this.service = service
    }

    public async create(orderInformations: any): Promise<Order> {
        return this.service.create(orderInformations)
    }

    public async delete(id: number): Promise<boolean> {
        return this.service.delete(id)
    }

    public async deleteAll(): Promise<boolean> {
        return this.service.deleteAll()
    }

    public async getById(id: number): Promise<Order> {
        return this.service.getById(id)
    }

    public async getAll (): Promise<Order[]> {
        const privateInfoContact1: any = {
                firstname: '****',
                lastname: '****',
                phone: '****',
                mail: '****',
                headOfficeAddress: {
                    postalCode: '****',
                    city: '****',
                    addressLine1: '****',
                    addressLine2: '****'
                }
        }
        const privateInfoContact2: any = {
            firstname: '****',
            lastname: '****',
            phone: '****',
            mail: '*****',
            billingAddress: {
                postalCode: '****',
                city: '****',
                addressLine1: '****',
                addressLine2: '****'
            },
            deliveryAddress: {
                postalCode: '****',
                city: '****',
                addressLine1: '****',
                addressLine2: '****'
            }
        }
        const orderArray: Order[] = await this.service.getAll()
        orderArray.forEach((order) => {
            order.contact = privateInfoContact2
            order.carrier.contact = privateInfoContact1
        })
        return orderArray
    }

    public async update(id: number, updateInformations: any): Promise<boolean> {
        return this.service.update(id, updateInformations)
    }
}
