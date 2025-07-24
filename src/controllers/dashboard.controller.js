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
exports.getSalesByCategory = exports.getSalesTrend = exports.getGeneralStats = exports.getTopProducts = exports.getSalesByMonth = void 0;
const DashboardModel = __importStar(require("../models/DashboardModel"));
const getSalesByMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const year = req.query.year ? parseInt(req.query.year) : undefined;
        const data = yield DashboardModel.getSalesByMonth(year);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener ventas por mes' });
    }
});
exports.getSalesByMonth = getSalesByMonth;
const getTopProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const data = yield DashboardModel.getTopProducts(limit);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener productos más vendidos' });
    }
});
exports.getTopProducts = getTopProducts;
const getGeneralStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield DashboardModel.getGeneralStats();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener estadísticas generales' });
    }
});
exports.getGeneralStats = getGeneralStats;
const getSalesTrend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield DashboardModel.getSalesTrend();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener tendencia de ventas' });
    }
});
exports.getSalesTrend = getSalesTrend;
const getSalesByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const months = req.query.months ? parseInt(req.query.months) : 7;
        const data = yield DashboardModel.getSalesByCategory(months);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener ventas por categoría' });
    }
});
exports.getSalesByCategory = getSalesByCategory;
