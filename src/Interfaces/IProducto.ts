interface IProducto{
    id?:number,
    name:string,
    price:number,
    createdAt?:Date,
    stock:number,
    category?:string,
    categoryId?:number,
    isVisible?:boolean
}

export default IProducto