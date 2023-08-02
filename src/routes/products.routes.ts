import { Router } from "express";
import { prisma } from "../dbClient";

const router = Router();


router.get("/", async (_req, res) => {
    const products = await prisma.product.findMany()
    res.json(products)
})

export default router