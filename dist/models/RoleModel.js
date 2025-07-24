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
exports.deleteRole = exports.updateRole = exports.createRole = exports.getRoleById = exports.getAllRoles = void 0;
const db_1 = require("../config/db");
const getAllRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query('SELECT * FROM roles');
    return rows;
});
exports.getAllRoles = getAllRoles;
const getRoleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query('SELECT * FROM roles WHERE id = ?', [id]);
    return rows[0];
});
exports.getRoleById = getRoleById;
const createRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = role;
    const [result] = yield db_1.db.query('INSERT INTO roles (name) VALUES (?)', [name]);
    return result;
});
exports.createRole = createRole;
const updateRole = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = role;
    const [result] = yield db_1.db.query('UPDATE roles SET name = ? WHERE id = ?', [name, id]);
    return result;
});
exports.updateRole = updateRole;
const deleteRole = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.db.query('DELETE FROM roles WHERE id = ?', [id]);
    return result;
});
exports.deleteRole = deleteRole;
