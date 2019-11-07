import IOrder from "./orders.interface";
 
export default interface IService {
    delete (id: number) : Promise<boolean>
 
    deleteAll() : Promise<boolean>
 
    getById(id: number) : Promise<IOrder>
 
    getAll() : Promise<IOrder[]>
 
    update(id: number, updateInformations: any): Promise<boolean>
 
    create(orderInformations : any) : Promise<IOrder>
}