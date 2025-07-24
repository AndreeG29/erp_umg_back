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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const db_1 = require("../config/db");
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query('SELECT * FROM products');
    return rows;
});
exports.getAllProducts = getAllProducts;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
});
exports.getProductById = getProductById;
const createProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, stock, category } = product;
    const [result] = yield db_1.db.query('INSERT INTO products (name, description, price, stock, category) VALUES (?, ?, ?, ?, ?)', [name, description, price, stock, category]);
    return result;
});
exports.createProduct = createProduct;
const updateProduct = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, stock, category } = product;
    const [result] = yield db_1.db.query('UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ? WHERE id = ?', [name, description, price, stock, category, id]);
    return result;
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.db.query('DELETE FROM products WHERE id = ?', [id]);
    return result;
});
exports.deleteProduct = deleteProduct;
