import express from "express";
import { getProducts, createProduct } from "../products/products.controller";
import { authMiddleware } from "../auth/auth.middleware";
import { requireRole } from "../auth/role.middleware";

const router = express.Router();

// Public route (everyone can see products)
router.get("/products", getProducts);

// Admin-only route
router.post("/products", authMiddleware, requireRole("ADMIN"), createProduct);

export default router;
