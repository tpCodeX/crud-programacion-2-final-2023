import { Router } from "express";
import CategoryController from "../controllers/categoryController";
const router = Router();
const categoryController=new CategoryController();

router.get("/",categoryController.handleCategoryList.bind(categoryController));



router.get("/add",categoryController.handleAddCategoryView.bind(categoryController));
router.post("/add",categoryController.handleAddCategory.bind(categoryController));


router.post("/edit",categoryController.handleUpdateCategoryView.bind(categoryController));
router.post("/editar",categoryController.handleUpdateCategory.bind(categoryController));

router.post("/delete",categoryController.handleDeleteCategory.bind(categoryController));

router.get("/:id", categoryController.handleCategoryById.bind(categoryController));
export default router