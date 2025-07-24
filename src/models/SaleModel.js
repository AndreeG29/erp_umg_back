"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSaleItems = exports.deleteSale = exports.updateSale = exports.createSale = exports.getSaleWithItems = exports.getSaleById = exports.getAllSales = void 0;
const db_1 = require("../config/db");
const getAllSales = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query(`
    SELECT s.*, c.name as client_name, u.name as user_name 
    FROM sales s 
    INNER JOIN clients c ON s.client_id = c.id 
    INNER JOIN users u ON s.user_id = u.id
  `);
    return rows;
});
exports.getAllSales = getAllSales;
const getSaleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query(`
    SELECT s.*, c.name as client_name, u.name as user_name 
    FROM sales s 
    INNER JOIN clients c ON s.client_id = c.id 
    INNER JOIN users u ON s.user_id = u.id 
    WHERE s.id = ?
  `, [id]);
    return rows[0];
});
exports.getSaleById = getSaleById;
const getSaleWithItems = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [sale] = yield db_1.db.query(`
    SELECT s.*, c.name as client_name, u.name as user_name 
    FROM sales s 
    INNER JOIN clients c ON s.client_id = c.id 
    INNER JOIN users u ON s.user_id = u.id 
    WHERE s.id = ?
  `, [id]);
    const [items] = yield db_1.db.query(`
    SELECT si.*, p.name as product_name 
    FROM sale_items si 
    JOIN products p ON si.product_id = p.id 
    WHERE si.sale_id = ?
  `, [id]);
    return Object.assign(Object.assign({}, sale[0]), { items });
});
exports.getSaleWithItems = getSaleWithItems;
const createSale = (saleData) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.db.getConnection();
    try {
        yield connection.beginTransaction();
        const { client_id, user_id, total, items } = saleData;
        // Verificar stock disponible para todos los productos
        for (const item of items) {
            const [product] = yield connection.query('SELECT stock FROM products WHERE id = ?', [item.product_id]);
            if (!product[0] || product[0].stock < item.quantity) {
                throw new Error(`Stock insuficiente para producto ID: ${item.product_id}`);
            }
        }
        // Crear venta
        const [saleResult] = yield connection.query('INSERT INTO sales (client_id, user_id, total) VALUES (?, ?, ?)', [client_id, user_id, total]);
        const saleId = saleResult.insertId;
        // Crear items y reducir stock
        for (const item of items) {
            yield connection.query('INSERT INTO sale_items (sale_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [saleId, item.product_id, item.quantity, item.price]);
            yield connection.query('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.product_id]);
        }
        yield connection.commit();
        return saleId;
    }
    catch (error) {
        yield connection.rollback();
        throw error;
    }
    finally {
        connection.release();
    }
});
exports.createSale = createSale;
const updateSale = (id, saleData) => __awaiter(void 0, void 0, void 0, function* () {
    const { client_id, user_id, total } = saleData;
    const [result] = yield db_1.db.query('UPDATE sales SET client_id = ?, user_id = ?, total = ? WHERE id = ?', [client_id, user_id, total, id]);
    return result;
});
exports.updateSale = updateSale;
const deleteSale = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.db.getConnection();
    try {
        yield connection.beginTransaction();
        // Eliminar items primero
        yield connection.query('DELETE FROM sale_items WHERE sale_id = ?', [id]);
        // Eliminar venta
        const [result] = yield connection.query('DELETE FROM sales WHERE id = ?', [id]);
        yield connection.commit();
        return result;
    }
    catch (error) {
        yield connection.rollback();
        throw error;
    }
    finally {
        connection.release();
    }
});
exports.deleteSale = deleteSale;
const getSaleItems = (saleId) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query(`
    SELECT si.*, p.name as product_name 
    FROM sale_items si 
    JOIN products p ON si.product_id = p.id 
    WHERE si.sale_id = ?
  `, [saleId]);
    return rows;
});
exports.getSaleItems = getSaleItems;
