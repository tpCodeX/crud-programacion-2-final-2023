import ICategory from "../Interfaces/ICategory";
import CategoryServices from "../services/categoryServices";
import {Request,Response,} from 'express';

class CategoryController{
    private services: CategoryServices;

    constructor(){
        this.services = new CategoryServices();
    }

    async handleCategoryList(_req:Request,res:Response){
        try{
            const categorias= await this.services.getCategories();
            return res.render("./categorias/list.ejs/",{categorias})
        }catch(err:any) {
            return res.render("./categorias/message.ejs",{message:err.message})
        }
    }

    async handleCategoryById(req:Request,res:Response){
        const {id}= req.params
        try{
            const categoria = await this.services.getCategoryById(+id);
            const categorias=[categoria]
            return res.render("./categorias/list.ejs",{categorias})
        }
        catch(err:any) {
            return res.render("./categorias/message.ejs",{message:err.message})
        }
    }


    async handleAddCategory(req:Request,res:Response){
        const data=req.body
        const establecerVisibilidad = (isVisible:string)=> {
            switch (isVisible) {
              case "0":
                return false;
              case "1":
                return true;
              default:
                return true;
            }
          };

        const visibilidad=establecerVisibilidad(data.visibilidad)
        try{
            const newCategory= await this.services.addCategory(data,visibilidad)
            return res.render("./categorias/message.ejs",{message:`La categoría ${newCategory.name} ha sido agregada con el ID ${newCategory.id}.`})
        }catch(err:any){
            return res.render("./categorias/message.ejs",{message:err.message}) 
        }
    }

    handleAddCategoryView(_req: Request, res: Response){
        res.render('./categorias/add.ejs')
    }

    
    async handleDeleteCategory(req:Request,res:Response){
        const params=req.body as ICategory
        const id=params.id?.toString()
        try{
            const deletedCategory= await this.services.deleteCategoria(id as string)
            return res.render('./categorias/message.ejs',{message:`La categoría ${deletedCategory.name} con el id ${deletedCategory.id} ha sido eliminada`})
        }catch(error:any){
            return res.render('./categorias/message.ejs',{message:error.message})}
    };
    
    
    async handleUpdateCategory(req:Request,res:Response){
        const data=req.body
        console.log(data)
        
        // let id= parseInt(data)
        const establecerVisibilidad = (isVisible:string)=> {
            switch (isVisible) {
              case "0":
                return false;
              case "1":
                return true;
              default:
                return true;
            }
          };

        const toUpdate:ICategory={
            "id":+data.id,
            "name":data.name.toString(),
            "isVisible":establecerVisibilidad(data.isVisible),
        }

        try{
            const updatedCategory:ICategory= await this.services.updateCategoria(toUpdate) as ICategory
            return res.render('./categorias/message.ejs',{message:`La categoría ha sido actualizada. El nuevo nombre es ${updatedCategory.name}.`})
        }catch(error:any){
            return res.render('./categorias/message.ejs',{message:error.message})
        }
    };

    async handleUpdateCategoryView(req: Request, res: Response){
        const params=req.body
        const id=parseInt(params.id)
        const categoria= await this.services.getCategoryById(id)
        res.render('./categorias/edit.ejs',{categoria});
    }
}

export default CategoryController;