"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployee = exports.getEmployees = void 0;
const EmployeeModel = __importStar(require("../models/EmployeeModel"));
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield EmployeeModel.getAllEmployees();
        res.json(employees);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener empleados' });
    }
});
exports.getEmployees = getEmployees;
const getEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const employee = yield EmployeeModel.getEmployeeById(id);
        if (!employee) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json(employee);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener empleado' });
    }
});
exports.getEmployee = getEmployee;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield EmployeeModel.createEmployee(req.body);
        res.status(201).json({ message: 'Empleado creado exitosamente', id: result });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear empleado' });
    }
});
exports.createEmployee = createEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield EmployeeModel.updateEmployee(id, req.body);
        res.json({ message: 'Empleado actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar empleado' });
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield EmployeeModel.deleteEmployee(id);
        res.json({ message: 'Empleado eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar empleado' });
    }
});
exports.deleteEmployee = deleteEmployee;
