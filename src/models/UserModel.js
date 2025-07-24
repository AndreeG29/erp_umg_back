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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = exports.findUserByEmail = void 0;
const db_1 = require("../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
});
exports.findUserByEmail = findUserByEmail;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query(`
    SELECT u.*, r.name as role_name 
    FROM users u 
    INNER JOIN roles r ON u.role_id = r.id
  `);
    return rows;
});
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query(`
    SELECT u.*, r.name as role_name 
    FROM users u 
    INNER JOIN roles r ON u.role_id = r.id 
    WHERE u.id = ?
  `, [id]);
    return rows[0];
});
exports.getUserById = getUserById;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role_id } = user;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const [result] = yield db_1.db.query('INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, role_id]);
    return result;
});
exports.createUser = createUser;
const updateUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role_id } = user;
    const hashedPassword = password ? yield bcrypt_1.default.hash(password, 10) : undefined;
    if (hashedPassword) {
        const [result] = yield db_1.db.query('UPDATE users SET name = ?, email = ?, password = ?, role_id = ? WHERE id = ?', [name, email, hashedPassword, role_id, id]);
        return result;
    }
    else {
        const [result] = yield db_1.db.query('UPDATE users SET name = ?, email = ?, role_id = ? WHERE id = ?', [name, email, role_id, id]);
        return result;
    }
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.db.query('DELETE FROM users WHERE id = ?', [id]);
    return result;
});
exports.deleteUser = deleteUser;
