import { db } from "../config/db";

export const getAllProducts = async () => {
  const [rows] = await db.query('SELECT * FROM products');
  return rows;
};

export const getProductById = async (id: number) => {
  const [rows]: any = await db.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

export const createProduct = async (product: any) => {
  const { name, description, price, stock, category } = product;
  const [result] = await db.query(
    'INSERT INTO products (name, description, price, stock, category) VALUES (?, ?, ?, ?, ?)',
    [name, description, price, stock, category]
  );
  return result;
};

export const updateProduct = async (id: number, product: any) => {
  const { name, description, price, stock, category } = product;
  const [result] = await db.query(
    'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ? WHERE id = ?',
    [name, description, price, stock, category, id]
  );
  return result;
};

export const deleteProduct = async (id: number) => {
  const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
  return result;
};
