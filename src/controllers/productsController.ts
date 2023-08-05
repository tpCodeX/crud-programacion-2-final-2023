// import IProducto from '../Interfaces/IProducto';
import IProducto from '../Interfaces/IProducto';
import { prisma } from '../dbClient';
import ProductServices from '../services/productServices';
import {Request,Response,} from 'express';

class ProductController{
    private services: ProductServices;

    constructor(){
        this.services = new ProductServices();
    }

    async handleCategoryList(_req:Request,res:Response){
        try{
            const products= await this.services.getProducts();
            return res.render("./productos/list.ejs/",{products})
        }catch(err:any) {
            return res.render("./productos/message.ejs",{message:err.message})
        }
    }

    async handleCategoryById(req:Request,res:Response){
        const {id}= req.params
        try{
            const product = await this.services.getProductByID(+id);
            const products=[product]
            return res.render("./productos/list.ejs",{products})
        }
        catch(err:any) {
            return res.render("./productos/message.ejs",{message:err.message})
        }
    }


    async handleAddProduct(req:Request,res:Response){
        const data=req.body
        const toAdd:IProducto={
            name:data.name.toString() as string,
            price:+data.price,
            stock:+data.stock,
            categoryId:+data.categoryId
        }
        try{
            const newProduct= await this.services.addProduct(toAdd)
            return res.render("./productos/message.ejs",{message:`La categoría ${newProduct.name} ha sido agregada con el ID ${newProduct.id} en la categoría ${newProduct.categoryId}`})
        }catch(err:any){
            return res.render("./productos/message.ejs",{message:err.message}) 
        }
    }

    async handleAddProductView(_req: Request, res: Response){
        const categorias=await prisma.category.findMany({
            where:{
                isVisible:true
            }
        });
        const arrayLenght:number=categorias.length;
        if(arrayLenght===0){
            return res.render('./productos/message.ejs',{message:`No existen categorías de productos. Cree una categoría antes de añadir un producto.`})
        }
        res.render('./productos/add.ejs',{categorias})
}
    

    
    async handleDeleteProduct(req:Request,res:Response){
        const params=req.body as IProducto
        const id=params.id?.toString()
        try{
            const deletedProduct= await this.services.deleteProduct(id as string)
            return res.render('./productos/message.ejs',{message:`El producto ${deletedProduct.name} con el id ${deletedProduct.id} ha sido eliminado`})
        }catch(error:any){
            return res.render('./productos/message.ejs',{message:error.message})}
    };
    
    
    async handleUpdateProduct(req:Request,res:Response){
        const data=req.body

        const toUpdate:IProducto={
            "id":+data.id,
            "name":data.name.toString(),
            "price":+data.price,
            "stock":+data.stock,
            "categoryId":+data.categoryId
        }

        try{
            const updatedProduct:IProducto= await this.services.updateProduct(toUpdate) as IProducto
            return res.render('./categorias/message.ejs',{message:`El producto ha sido actualizada. Los nuevos datos son ${updatedProduct.name}, $${updatedProduct.price},${updatedProduct.stock} unidades.`})
        }catch(error:any){
            return res.render('./categorias/message.ejs',{message:error.message})
        }
    };

    async handleUpdateProductView(req: Request, res: Response){
        // const params=req.body
        // const id=parseInt(params.id)
        const product= await this.services.getProductByID(+req.body.id)
        const categorias=await prisma.category.findMany({
            where:{
                isVisible:true
            }
        });
        res.render('./productos/edit.ejs',{product,categorias});
    };
};

export default ProductController;