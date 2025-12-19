import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is working");
});

// CREATE product
app.post("/products", async (req, res) => {
  const { name, price } = req.body;

  try {
    const product = await prisma.product.create({
      data: { name, price },
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all products
app.post("/products", async (req, res) => {
  const { name, price, stock = 0, description = null, imageUrl = null } = req.body;

  const product = await prisma.product.create({
    data: { name, price, stock, description, imageUrl },
  });

  res.json(product);
});
