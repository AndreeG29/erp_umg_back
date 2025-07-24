import { db } from "../config/db";

export const getRolePermissions = async (roleId: number) => {
  const [rows] = await db.query('SELECT * FROM role_access WHERE role_id = ?', [roleId]);
  return rows;
};

export const getAllRoleAccess = async () => {
  const [rows] = await db.query('SELECT * FROM role_access');
  return rows;
};

export const createRoleAccess = async (roleAccess: any) => {
  const { role_id, route, can_view, can_create, can_edit, can_delete } = roleAccess;
  const [result] = await db.query(
    'INSERT INTO role_access (role_id, route, can_view, can_create, can_edit, can_delete) VALUES (?, ?, ?, ?, ?, ?)',
    [role_id, route, can_view, can_create, can_edit, can_delete]
  );
  return result;
};

export const updateRoleAccess = async (id: number, roleAccess: any) => {
  const { role_id, route, can_view, can_create, can_edit, can_delete } = roleAccess;
  const [result] = await db.query(
    'UPDATE role_access SET role_id = ?, route = ?, can_view = ?, can_create = ?, can_edit = ?, can_delete = ? WHERE id = ?',
    [role_id, route, can_view, can_create, can_edit, can_delete, id]
  );
  return result;
};

export const deleteRoleAccess = async (id: number) => {
  const [result] = await db.query('DELETE FROM role_access WHERE id = ?', [id]);
  return result;
};