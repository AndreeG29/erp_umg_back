import { db } from "../config/db";

export const getAllSales = async () => {
  const [rows] = await db.query(`
    SELECT s.*, c.name as client_name, u.name as user_name 
    FROM sales s 
    INNER JOIN clients c ON s.client_id = c.id 
    INNER JOIN users u ON s.user_id = u.id
  `);
  return rows;
};

export const getSaleById = async (id: number) => {
  const [rows]: any = await db.query(`
    SELECT s.*, c.name as client_name, u.name as user_name 
    FROM sales s 
    INNER JOIN clients c ON s.client_id = c.id 
    INNER JOIN users u ON s.user_id = u.id 
    WHERE s.id = ?
  `, [id]);
  return rows[0];
};

export const getSaleWithItems = async (id: number) => {
  const [sale]: any = await db.query(`
    SELECT s.*, c.name as client_name, u.name as user_name 
    FROM sales s 
    INNER JOIN clients c ON s.client_id = c.id 
    INNER JOIN users u ON s.user_id = u.id 
    WHERE s.id = ?
  `, [id]);
  const [items] = await db.query(`
    SELECT si.*, p.name as product_name 
    FROM sale_items si 
    JOIN products p ON si.product_id = p.id 
    WHERE si.sale_id = ?
  `, [id]);
  return { ...sale[0], items };
};

export const createSale = async (saleData: any) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    
    const { client_id, user_id, total, items } = saleData;
    
    // Verificar stock disponible para todos los productos
    for (const item of items) {
      const [product]: any = await connection.query('SELECT stock FROM products WHERE id = ?', [item.product_id]);
      if (!product[0] || product[0].stock < item.quantity) {
        throw new Error(`Stock insuficiente para producto ID: ${item.product_id}`);
      }
    }
    
    // Crear venta
    const [saleResult]: any = await connection.query(
      'INSERT INTO sales (client_id, user_id, total) VALUES (?, ?, ?)',
      [client_id, user_id, total]
    );
    
    const saleId = saleResult.insertId;
    
    // Crear items y reducir stock
    for (const item of items) {
      await connection.query(
        'INSERT INTO sale_items (sale_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [saleId, item.product_id, item.quantity, item.price]
      );
      
      await connection.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }
    
    await connection.commit();
    return saleId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const updateSale = async (id: number, saleData: any) => {
  const { client_id, user_id, total } = saleData;
  const [result] = await db.query(
    'UPDATE sales SET client_id = ?, user_id = ?, total = ? WHERE id = ?',
    [client_id, user_id, total, id]
  );
  return result;
};

export const deleteSale = async (id: number) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    
    // Eliminar items primero
    await connection.query('DELETE FROM sale_items WHERE sale_id = ?', [id]);
    
    // Eliminar venta
    const [result] = await connection.query('DELETE FROM sales WHERE id = ?', [id]);
    
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const getSaleItems = async (saleId: number) => {
  const [rows] = await db.query(`
    SELECT si.*, p.name as product_name 
    FROM sale_items si 
    JOIN products p ON si.product_id = p.id 
    WHERE si.sale_id = ?
  `, [saleId]);
  return rows;
};