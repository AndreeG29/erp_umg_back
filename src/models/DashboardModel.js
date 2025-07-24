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
exports.getSalesByCategory = exports.getSalesTrend = exports.getGeneralStats = exports.getTopProducts = exports.getSalesByMonth = void 0;
const db_1 = require("../config/db");
const getSalesByMonth = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (year = new Date().getFullYear()) {
    const [rows] = yield db_1.db.query(`
    SELECT 
      MONTH(sale_date) as month,
      SUM(total) as total
    FROM 
      sales
    WHERE 
      YEAR(sale_date) = ?
    GROUP BY 
      MONTH(sale_date)
    ORDER BY 
      month
  `, [year]);
    // Crear array de 12 meses con valores 0
    const monthlyData = Array(12).fill(0);
    // Llenar con datos reales
    if (Array.isArray(rows)) {
        rows.forEach((row) => {
            monthlyData[row.month - 1] = parseFloat(row.total);
        });
    }
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return {
        labels: monthNames,
        values: monthlyData
    };
});
exports.getSalesByMonth = getSalesByMonth;
const getTopProducts = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (limit = 5) {
    const [rows] = yield db_1.db.query(`
    SELECT 
      p.name,
      SUM(si.quantity) as total_sold
    FROM 
      sale_items si
    JOIN 
      products p ON si.product_id = p.id
    GROUP BY 
      si.product_id
    ORDER BY 
      total_sold DESC
    LIMIT ?
  `, [limit]);
    let labels = [];
    let values = [];
    if (Array.isArray(rows)) {
        labels = rows.map((row) => row.name);
        values = rows.map((row) => parseInt(row.total_sold));
    }
    return {
        labels,
        values
    };
});
exports.getTopProducts = getTopProducts;
const getGeneralStats = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    // Total de ventas en Quetzales
    const [salesResult] = yield db_1.db.query('SELECT SUM(total) as totalSales FROM sales');
    const totalSales = ((_a = salesResult[0]) === null || _a === void 0 ? void 0 : _a.totalSales) ? parseFloat(salesResult[0].totalSales) : 0;
    // Número total de productos
    const [productsResult] = yield db_1.db.query('SELECT COUNT(*) as totalProducts FROM products');
    const totalProducts = ((_b = productsResult[0]) === null || _b === void 0 ? void 0 : _b.totalProducts) ? parseInt(productsResult[0].totalProducts) : 0;
    // Número total de clientes
    const [clientsResult] = yield db_1.db.query('SELECT COUNT(*) as totalClients FROM clients');
    const totalClients = ((_c = clientsResult[0]) === null || _c === void 0 ? void 0 : _c.totalClients) ? parseInt(clientsResult[0].totalClients) : 0;
    // Número total de empleados
    const [employeesResult] = yield db_1.db.query('SELECT COUNT(*) as totalEmployees FROM employees');
    const totalEmployees = ((_d = employeesResult[0]) === null || _d === void 0 ? void 0 : _d.totalEmployees) ? parseInt(employeesResult[0].totalEmployees) : 0;
    return {
        totalSales,
        totalProducts,
        totalClients,
        totalEmployees
    };
});
exports.getGeneralStats = getGeneralStats;
const getSalesTrend = () => __awaiter(void 0, void 0, void 0, function* () {
    // Obtener los últimos 12 meses de ventas
    const [rows] = yield db_1.db.query(`
    SELECT 
      DATE_FORMAT(MIN(sale_date), '%b') AS month,  -- o MAX(sale_date)
      MONTH(sale_date) AS month_num,
      YEAR(sale_date) AS year,
      SUM(total) AS total
    FROM 
      sales
    WHERE 
      sale_date >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 12 MONTH), '%Y-%m-01')
    GROUP BY 
      YEAR(sale_date), MONTH(sale_date)
    ORDER BY 
      year, month_num;
  `);
    // Crear array para los últimos 12 meses
    const monthNames = [];
    const values = [];
    if (Array.isArray(rows)) {
        rows.forEach((row) => {
            monthNames.push(row.month);
            values.push(parseFloat(row.total));
        });
    }
    return {
        labels: monthNames,
        values: values
    };
});
exports.getSalesTrend = getSalesTrend;
const getSalesByCategory = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (months = 7) {
    // Obtener ventas por categoría para los últimos N meses
    const [rows] = yield db_1.db.query(`
    SELECT 
   p.category AS category,
   DATE_FORMAT(MIN(s.sale_date), '%b') AS month,
   MONTH(s.sale_date) AS month_num,
   YEAR(s.sale_date) AS year,
   SUM(si.quantity * si.price) AS total
FROM 
   sales s
JOIN 
   sale_items si ON s.id = si.sale_id
JOIN 
   products p ON si.product_id = p.id
WHERE 
   s.sale_date >= '2024-07-01'
GROUP BY 
   p.category, YEAR(s.sale_date), MONTH(s.sale_date)
ORDER BY 
   p.category, year, month_num;
  `, [months]);
    const monthsSet = new Set();
    const categoriesMap = new Map();
    if (Array.isArray(rows)) {
        rows.forEach((row) => {
            var _a;
            const { category, month, total } = row;
            monthsSet.add(month);
            if (!categoriesMap.has(category)) {
                categoriesMap.set(category, new Map());
            }
            (_a = categoriesMap.get(category)) === null || _a === void 0 ? void 0 : _a.set(month, parseFloat(total));
        });
    }
    // Convertir a arrays ordenados
    const monthsArray = Array.from(monthsSet);
    const categories = Array.from(categoriesMap.entries()).map(([name, monthData]) => {
        const values = monthsArray.map(month => monthData.get(month) || 0);
        return { name, values };
    });
    return {
        months: monthsArray,
        categories
    };
});
exports.getSalesByCategory = getSalesByCategory;
