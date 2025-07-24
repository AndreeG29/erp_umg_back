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
exports.getSaleItems = exports.deleteSale = exports.updateSale = exports.createSale = exports.getSale = exports.getSales = void 0;
const SaleModel = __importStar(require("../models/SaleModel"));
const getSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield SaleModel.getAllSales();
        res.json(sales);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener ventas' });
    }
});
exports.getSales = getSales;
const getSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const sale = yield SaleModel.getSaleWithItems(id);
        if (!sale.id) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.json(sale);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener venta' });
    }
});
exports.getSale = getSale;
const createSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saleId = yield SaleModel.createSale(req.body);
        res.status(201).json({ message: 'Venta creada exitosamente', id: saleId });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear venta' });
    }
});
exports.createSale = createSale;
const updateSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield SaleModel.updateSale(id, req.body);
        res.json({ message: 'Venta actualizada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar venta' });
    }
});
exports.updateSale = updateSale;
const deleteSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield SaleModel.deleteSale(id);
        res.json({ message: 'Venta eliminada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar venta' });
    }
});
exports.deleteSale = deleteSale;
const getSaleItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saleId = parseInt(req.params.id);
        const items = yield SaleModel.getSaleItems(saleId);
        res.json(items);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener items de la venta' });
    }
});
exports.getSaleItems = getSaleItems;
