import { db } from "../config/db";

export const getSalesByMonth = async (year = new Date().getFullYear()) => {
  const [rows]: any = await db.query(`
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
    rows.forEach((row: any) => {
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
};

export const getTopProducts = async (limit = 5) => {
  const [rows]: any = await db.query(`
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

  let labels: string[] = [];
  let values: number[] = [];

  if (Array.isArray(rows)) {
    labels = rows.map((row: any) => row.name);
    values = rows.map((row: any) => parseInt(row.total_sold));
  }

  return {
    labels,
    values
  };
};

export const getGeneralStats = async () => {
  // Total de ventas en Quetzales
  const [salesResult]: any = await db.query('SELECT SUM(total) as totalSales FROM sales');
  const totalSales = salesResult[0]?.totalSales ? parseFloat(salesResult[0].totalSales) : 0;

  // Número total de productos
  const [productsResult]: any = await db.query('SELECT COUNT(*) as totalProducts FROM products');
  const totalProducts = productsResult[0]?.totalProducts ? parseInt(productsResult[0].totalProducts) : 0;

  // Número total de clientes
  const [clientsResult]: any = await db.query('SELECT COUNT(*) as totalClients FROM clients');
  const totalClients = clientsResult[0]?.totalClients ? parseInt(clientsResult[0].totalClients) : 0;

  // Número total de empleados
  const [employeesResult]: any = await db.query('SELECT COUNT(*) as totalEmployees FROM employees');
  const totalEmployees = employeesResult[0]?.totalEmployees ? parseInt(employeesResult[0].totalEmployees) : 0;

  return {
    totalSales,
    totalProducts,
    totalClients,
    totalEmployees
  };
};

export const getSalesTrend = async () => {
  // Obtener los últimos 12 meses de ventas
  const [rows]: any = await db.query(`
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
  const monthNames: string[] = [];
  const values: number[] = [];

  if (Array.isArray(rows)) {
    rows.forEach((row: any) => {
      monthNames.push(row.month);
      values.push(parseFloat(row.total));
    });
  }

  return {
    labels: monthNames,
    values: values
  };
};

export const getSalesByCategory = async (months = 7) => {
  // Obtener ventas por categoría para los últimos N meses
  const [rows]: any = await db.query(`
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


  const monthsSet = new Set<string>();
  const categoriesMap = new Map<string, Map<string, number>>();

  if (Array.isArray(rows)) {
    rows.forEach((row: any) => {
      const { category, month, total } = row;
      monthsSet.add(month);

      if (!categoriesMap.has(category)) {
        categoriesMap.set(category, new Map<string, number>());
      }

      categoriesMap.get(category)?.set(month, parseFloat(total));
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
};