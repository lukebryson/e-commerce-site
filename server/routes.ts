import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { insertOrderSchema, productWithSuppliersSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Load products from JSON file
  const productsJsonPath = path.join(import.meta.dirname, "productsJsonServer.json");
  
  try {
    const productsData = JSON.parse(fs.readFileSync(productsJsonPath, "utf-8"));
    storage.loadProducts(productsData.products);
    
    // API routes
    app.get("/api/products", async (req, res) => {
      try {
        const products = await storage.getAllProducts();
        res.json(products);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
      }
    });

    app.get("/api/products/:id", async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        const product = await storage.getProductById(id);
        
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
        
        res.json(product);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch product" });
      }
    });

    app.post("/api/orders", async (req, res) => {
      try {
        const orderData = insertOrderSchema.parse(req.body);
        const order = await storage.createOrder(orderData);
        res.status(201).json(order);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: "Invalid order data", details: error.errors });
        }
        res.status(500).json({ error: "Failed to create order" });
      }
    });

    app.get("/api/orders", async (req, res) => {
      try {
        const orders = await storage.getOrders();
        res.json(orders);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
      }
    });

    app.patch("/api/products/:id/stock", async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        const { stock } = req.body;
        
        if (typeof stock !== "number" || stock < 0) {
          return res.status(400).json({ error: "Invalid stock value" });
        }
        
        const product = await storage.updateProductStock(id, stock);
        
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
        
        res.json(product);
      } catch (error) {
        res.status(500).json({ error: "Failed to update product stock" });
      }
    });
  } catch (error) {
    console.error("Failed to load products from JSON:", error);
  }

  const httpServer = createServer(app);
  return httpServer;
}
