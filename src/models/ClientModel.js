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
exports.deleteClient = exports.updateClient = exports.createClient = exports.getClientById = exports.getAllClients = void 0;
const db_1 = require("../config/db");
const getAllClients = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query('SELECT * FROM clients WHERE state = 1');
    return rows;
});
exports.getAllClients = getAllClients;
const getClientById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query('SELECT * FROM clients WHERE id = ?', [id]);
    return rows[0];
});
exports.getClientById = getClientById;
const createClient = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, address } = client;
    const [result] = yield db_1.db.query('INSERT INTO clients (name, email, phone, address,enterprise) VALUES (?, ?, ?, ?)', [name, email, phone, address]);
    return result;
});
exports.createClient = createClient;
const updateClient = (id, client) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, address, enterprise } = client;
    const [result] = yield db_1.db.query('UPDATE clients SET name = ?, email = ?, phone = ?, address = ?, enterprise = ? WHERE id = ?', [name, email, phone, address, enterprise, id]);
    return result;
});
exports.updateClient = updateClient;
const deleteClient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.db.query('UPDATE clients set state = 0  WHERE id = ?', [id]);
    return result;
});
exports.deleteClient = deleteClient;
