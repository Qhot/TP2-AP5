export default interface IOrder {
    id: number
    createAt: string
    packages: IPackage[]
    contact: IContact
    carrier: ICarrier
}

interface IPackage {
    length: ILength
    width: IWidth
    height: IHeight
    weight: IWeight
    products: IProducts[]
}

interface ILength {
    unit: string
    value: number
}

interface IWidth {
    unit: string
    value: number
}

interface IHeight {
    unit: string
    value: number
}

interface IWeight {
    unit: string
    value: number
}

interface IProducts {
    quantity: number
    label: string
    ean: string
}

interface IContact {
    firstname: string
    lastname: string
    phone: string
    mail: string
    billingAddress: IAddress
    deliveryAddress: IAddress
    headOfficeAddress: IAddress
}

interface IAddress {
    postalCode: string
    city: string
    addressLine1: string
    addressLine2: string
}

interface ICarrier {
    name: string
    contact: IContact
}