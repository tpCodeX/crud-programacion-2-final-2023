interface IProducto{
    id?:number,
    name:string,
    price:number,
    createdAt?:string,
    stock:number,
    category?:string,
    categoryId?:string,
    isVisible?:boolean
}

export default IProducto