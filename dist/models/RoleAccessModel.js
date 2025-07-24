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
exports.deleteRoleAccess = exports.updateRoleAccess = exports.createRoleAccess = exports.getAllRoleAccess = exports.getRolePermissions = void 0;
const db_1 = require("../config/db");
const getRolePermissions = (roleId) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query('SELECT * FROM role_access WHERE role_id = ?', [roleId]);
    return rows;
});
exports.getRolePermissions = getRolePermissions;
const getAllRoleAccess = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query('SELECT * FROM role_access');
    return rows;
});
exports.getAllRoleAccess = getAllRoleAccess;
const createRoleAccess = (roleAccess) => __awaiter(void 0, void 0, void 0, function* () {
    const { role_id, route, can_view, can_create, can_edit, can_delete } = roleAccess;
    const [result] = yield db_1.db.query('INSERT INTO role_access (role_id, route, can_view, can_create, can_edit, can_delete) VALUES (?, ?, ?, ?, ?, ?)', [role_id, route, can_view, can_create, can_edit, can_delete]);
    return result;
});
exports.createRoleAccess = createRoleAccess;
const updateRoleAccess = (id, roleAccess) => __awaiter(void 0, void 0, void 0, function* () {
    const { role_id, route, can_view, can_create, can_edit, can_delete } = roleAccess;
    const [result] = yield db_1.db.query('UPDATE role_access SET role_id = ?, route = ?, can_view = ?, can_create = ?, can_edit = ?, can_delete = ? WHERE id = ?', [role_id, route, can_view, can_create, can_edit, can_delete, id]);
    return result;
});
exports.updateRoleAccess = updateRoleAccess;
const deleteRoleAccess = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.db.query('DELETE FROM role_access WHERE id = ?', [id]);
    return result;
});
exports.deleteRoleAccess = deleteRoleAccess;
