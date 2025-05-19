import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema - reused from the original schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Supplier schema
export const suppliers = pgTable("suppliers", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
});

export const insertSupplierSchema = createInsertSchema(suppliers).pick({
  companyName: true,
});

export type InsertSupplier = z.infer<typeof insertSupplierSchema>;
export type Supplier = typeof suppliers.$inferSelect;

// Product schema
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  productName: text("product_name").notNull(),
  unitPrice: integer("unit_price").notNull(),
  unitsInStock: integer("units_in_stock").notNull().default(0),
  supplierId: integer("supplier_id").notNull(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  productName: true,
  unitPrice: true,
  unitsInStock: true,
  supplierId: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Order schema
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerAddress: text("customer_address").notNull(),
  customerCity: text("customer_city").notNull(),
  customerPostalCode: text("customer_postal_code").notNull(),
  totalAmount: integer("total_amount").notNull(),
  orderDate: text("order_date").notNull(),
  orderItems: jsonb("order_items").notNull(), // Array of order items as JSON
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  customerName: true,
  customerEmail: true,
  customerAddress: true,
  customerCity: true,
  customerPostalCode: true,
  totalAmount: true,
  orderDate: true,
  orderItems: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Order Item schema (used in the orderItems JSON array)
export const orderItemSchema = z.object({
  productId: z.number(),
  productName: z.string(),
  unitPrice: z.number(),
  quantity: z.number(),
  totalPrice: z.number(),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

// Product with Suppliers (for API response)
export const productWithSuppliersSchema = z.object({
  id: z.number(),
  ProductName: z.string(),
  UnitPrice: z.number(),
  UnitsInStock: z.number(),
  Suppliers: z.array(
    z.object({
      CompanyName: z.string(),
    })
  ),
});

export type ProductWithSuppliers = z.infer<typeof productWithSuppliersSchema>;

// Cart Item schema (for client-side)
export const cartItemSchema = z.object({
  id: z.number(),
  productName: z.string(),
  unitPrice: z.number(),
  quantity: z.number(),
  supplierName: z.string(),
  maxQuantity: z.number(),
});

export type CartItem = z.infer<typeof cartItemSchema>;

// Customer Info schema (for checkout)
export const customerInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
});

export type CustomerInfo = z.infer<typeof customerInfoSchema>;
