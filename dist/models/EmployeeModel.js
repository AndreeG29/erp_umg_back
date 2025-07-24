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
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployeeById = exports.getAllEmployees = void 0;
const db_1 = require("../config/db");
const getAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query('SELECT * FROM employees');
    return rows;
});
exports.getAllEmployees = getAllEmployees;
const getEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query('SELECT * FROM employees WHERE id = ?', [id]);
    return rows[0];
});
exports.getEmployeeById = getEmployeeById;
const createEmployee = (employee) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, position, department, salary, user_id, state } = employee;
    const [result] = yield db_1.db.query('INSERT INTO employees (name, email, phone, position, department, salary, user_id, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, email, phone, position, department, salary, user_id, state]);
    return result;
});
exports.createEmployee = createEmployee;
const updateEmployee = (id, employee) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, position, department, salary, user_id, state } = employee;
    const [result] = yield db_1.db.query('UPDATE employees SET name = ?, email = ?, phone = ?, position = ?, department = ?, salary = ?, user_id = ?, state = ? WHERE id = ?', [name, email, phone, position, department, salary, user_id, state, id]);
    return result;
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.db.query('DELETE FROM employees WHERE id = ?', [id]);
    return result;
});
exports.deleteEmployee = deleteEmployee;
