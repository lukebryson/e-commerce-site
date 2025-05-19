import {
  Product,
  Supplier,
  InsertProduct,
  Order,
  InsertOrder,
  ProductWithSuppliers,
  OrderItem,
} from "@shared/schema";

export interface IStorage {
  getAllProducts(): Promise<ProductWithSuppliers[]>;
  getProductById(id: number): Promise<ProductWithSuppliers | undefined>;
  updateProductStock(id: number, newStock: number): Promise<ProductWithSuppliers | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  getOrders(): Promise<Order[]>;
}

export class MemStorage implements IStorage {
  private products: Map<number, ProductWithSuppliers>;
  private orders: Map<number, Order>;
  private orderId: number;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    this.orderId = 1;
    // Products will be loaded from the productsJsonServer.json file
  }

  loadProducts(productsData: any[]) {
    productsData.forEach((product) => {
      this.products.set(product.id, product);
    });
  }

  async getAllProducts(): Promise<ProductWithSuppliers[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<ProductWithSuppliers | undefined> {
    return this.products.get(id);
  }

  async updateProductStock(
    id: number, 
    newStock: number
  ): Promise<ProductWithSuppliers | undefined> {
    const product = this.products.get(id);
    
    if (product && newStock >= 0) {
      const updatedProduct = { ...product, UnitsInStock: newStock };
      this.products.set(id, updatedProduct);
      return updatedProduct;
    }
    
    return undefined;
  }

  async createOrder(orderData: InsertOrder): Promise<Order> {
    const id = this.orderId++;
    const order: Order = { ...orderData, id };
    this.orders.set(id, order);
    
    // Update product stock
    const orderItems = orderData.orderItems as unknown as OrderItem[];
    orderItems.forEach(async (item) => {
      const product = await this.getProductById(item.productId);
      if (product) {
        const newStock = product.UnitsInStock - item.quantity;
        await this.updateProductStock(item.productId, newStock);
      }
    });
    
    return order;
  }

  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
}

export const storage = new MemStorage();
