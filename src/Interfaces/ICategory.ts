import IProducto from "./IProducto"

interface ICategory{
    id?:number,
    isVisible?:boolean
    name:string
    products?:IProducto[]
}

export default ICategory