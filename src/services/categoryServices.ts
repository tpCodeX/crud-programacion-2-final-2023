import { prisma } from "../dbClient";
import ICategory from '../Interfaces/ICategory';

class CategoryServices {
  async getCategories() {
    const categorias = await prisma.category.findMany({
      where: {
        isVisible: true,
      },
    });
    if (!categorias){
      throw new Error(
        "Error 404. No se encontraron categorías."
      );
    }
    return categorias
  }

  async getCategoryById(id:number) {
    if (!id){
      throw new Error(
        "Error 409. No se recibe el ID."
      );
    }
    const categoria = await prisma.category.findFirst({
      where: {
        id: id,
      },
    });
    if (!categoria) {
      throw new Error(
        "Error 404. La categoría no existe o no está disponible."
      );
    }
    return categoria
  }

  async addCategory(data:ICategory,visibilidad:boolean) {
    const {name}=data;
    const categoriaExiste = await prisma.category.findFirst({
      where: {
        name:name
      },
    });

    if (categoriaExiste) {
      throw new Error(
        "Error 409. La categoría que se intenta registrar, ya existe."
      )
    }

    const newCategoria = await prisma.category.create({
      data: {
        name:name,
        isVisible:visibilidad
      },
    });
    return newCategoria
  }

  async updateCategoria(data:ICategory) {

    if(!data){
      return "Error 400. Bad Request. Revise los datos y vuelva a enviar el formulario."}
  
    const categoriaExiste = await prisma.category.findFirst({
      where: {
        id: data.id,
      }
    });
    if (!categoriaExiste) {
      throw new Error(
        "Error 404. La categoría que intenta actualizar, no existe o no está disponible."
      );
    }

    const updatedCategoria = await prisma.category.update({
      where: {
        id:data.id,
      },
      data: {
        name: data.name,
        isVisible: data.isVisible,
      },
    });

    return updatedCategoria;
  }

  async deleteCategoria(id:string) {
    const categoryID:number=parseInt(id)
    const categoriaExiste = await prisma.category.findFirst({
      where: { id: categoryID },
    });
    if (!categoriaExiste) {
      throw new Error(
        "Error. La categoría que se quiere eliminar, no existe o ya fué eliminada."
      );
    }
    const deletedCategoria = await prisma.category.delete({
      where: { id: categoryID },
    });
    return deletedCategoria;
  };


};

export default CategoryServices;
