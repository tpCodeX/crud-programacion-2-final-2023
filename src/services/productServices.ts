import { prisma } from "../dbClient";
import IProducto from "../Interfaces/IProducto";

class ProductServices {
  async getProducts() {
    const products = await prisma.product.findMany({
        include:{
            category:true
        }
    });
    if (!products){
      throw new Error(
        "Error 404. No se encontraron productos."
      );
    }
    return products
  }

  async getProductByID(id:number) {
    if (!id){
      throw new Error(
        "Error 409. No se recibe el ID."
      );
    }
    const product = await prisma.product.findFirst({
      where: {
        id: id,
      },
    });
    if (!product) {
      throw new Error(
        "Error 404. El producto no existe o no está disponible."
      );
    }
    return product
  }

  async addProduct(data:IProducto) {
    const {name,price,stock,categoryId}:IProducto=data
    const productoExiste = await prisma.product.findFirst({
      include:{
        category:true
      },
      where: {
        name:name
      },
    });
    if (productoExiste) {
      throw new Error(
        "Error 409. La categoría que se intenta registrar, ya existe."
      )
    }
    const newProducto = await prisma.product.create({
      data: {
        name:name,
        price:price,
        stock:stock,
        categoryId:categoryId as number,
      },
    });
    return newProducto
  };

  async updateProduct(data:IProducto) {

    if(!data){
      return "Error 400. Bad Request. Revise los datos y vuelva a enviar el formulario."}
  
    const productoExiste = await prisma.product.findFirst({
      include:{
        category:true
      },
      where: {
        id: data.id,
      }
    });
    if (!productoExiste) {
      throw new Error(
        "Error 404. El producto que intenta actualizar, no existe o no está disponible."
      );
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id:data.id,
      },
      data: {
        name: data.name,
        price:data.price,
        stock:data.stock,
        categoryId:data.categoryId
      },
    });

    return updatedProduct;
  }

  async deleteProduct(id:string) {
    // const productID:number=parseInt(id)
    const productoExiste = await prisma.product.findFirst({
      where: { id: +id },
    });
    if (!productoExiste) {
      throw new Error(
        "Error. El producto que se quiere eliminar, no existe o ya fué eliminada."
      );
    }
    const deletedProduct = await prisma.product.delete({
      where: { id: +id },
    });
    return deletedProduct;
  };


};

export default ProductServices;
