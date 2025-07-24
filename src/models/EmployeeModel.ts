import { db } from "../config/db";

export const getAllEmployees = async () => {
  const [rows] = await db.query('SELECT * FROM employees');
  return rows;
};

export const getEmployeeById = async (id: number) => {
  const [rows]: any = await db.query('SELECT * FROM employees WHERE id = ?', [id]);
  return rows[0];
};

export const createEmployee = async (employee: any) => {
  const { name, email, phone, position, department, salary, user_id, state } = employee;
  const [result] = await db.query(
    'INSERT INTO employees (name, email, phone, position, department, salary, user_id, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, email, phone, position, department, salary, user_id, state]
  );
  return result;
};

export const updateEmployee = async (id: number, employee: any) => {
  const { name, email, phone, position, department, salary, user_id, state } = employee;
  const [result] = await db.query(
    'UPDATE employees SET name = ?, email = ?, phone = ?, position = ?, department = ?, salary = ?, user_id = ?, state = ? WHERE id = ?',
    [name, email, phone, position, department, salary, user_id, state, id]
  );
  return result;
};

export const deleteEmployee = async (id: number) => {
  const [result] = await db.query('DELETE FROM employees WHERE id = ?', [id]);
  return result;
};