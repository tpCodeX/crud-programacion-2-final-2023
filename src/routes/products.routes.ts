import { Router } from "express";
import ProductController from "../controllers/productsController";
const router = Router();

const productController=new ProductController();

router.get("/",productController.handleCategoryList.bind(productController));

router.get("/add",productController.handleAddProductView.bind(productController));

router.post("/add",productController.handleAddProduct.bind(productController));



router.post("/edit",productController.handleUpdateProductView.bind(productController));
router.post("/editar",productController.handleUpdateProduct.bind(productController));

router.post("/delete",productController.handleDeleteProduct.bind(productController));

router.get("/:id", productController.handleCategoryById.bind(productController));

export default router