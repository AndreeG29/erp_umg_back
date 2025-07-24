import { db } from "../config/db";

export const getAllRoles = async () => {
  const [rows] = await db.query('SELECT * FROM roles');
  return rows;
};

export const getRoleById = async (id: number) => {
  const [rows]: any = await db.query('SELECT * FROM roles WHERE id = ?', [id]);
  return rows[0];
};

export const createRole = async (role: any) => {
  const { name } = role;
  const [result] = await db.query(
    'INSERT INTO roles (name) VALUES (?)',
    [name]
  );
  return result;
};

export const updateRole = async (id: number, role: any) => {
  const { name } = role;
  const [result] = await db.query(
    'UPDATE roles SET name = ? WHERE id = ?',
    [name, id]
  );
  return result;
};

export const deleteRole = async (id: number) => {
  const [result] = await db.query('DELETE FROM roles WHERE id = ?', [id]);
  return result;
};