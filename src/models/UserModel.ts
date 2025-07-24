import { db } from "../config/db";
import bcrypt from 'bcrypt';

export const findUserByEmail = async (email: string) => {
    const [rows]: any = await db.query('SELECT * FROM users WHERE email = ?' , [email]);
    return rows[0];
}

export const getAllUsers = async () => {
  const [rows] = await db.query(`
    SELECT u.*, r.name as role_name 
    FROM users u 
    INNER JOIN roles r ON u.role_id = r.id
  `);
  return rows;
};

export const getUserById = async (id: number) => {
  const [rows]: any = await db.query(`
    SELECT u.*, r.name as role_name 
    FROM users u 
    INNER JOIN roles r ON u.role_id = r.id 
    WHERE u.id = ?
  `, [id]);
  return rows[0];
};

export const createUser = async (user: any) => {
  const { name, email, password, role_id } = user;
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.query(
    'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, role_id]
  );
  return result;
};

export const updateUser = async (id: number, user: any) => {
  const { name, email, password, role_id } = user;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
  
  if (hashedPassword) {
    const [result] = await db.query(
      'UPDATE users SET name = ?, email = ?, password = ?, role_id = ? WHERE id = ?',
      [name, email, hashedPassword, role_id, id]
    );
    return result;
  } else {
    const [result] = await db.query(
      'UPDATE users SET name = ?, email = ?, role_id = ? WHERE id = ?',
      [name, email, role_id, id]
    );
    return result;
  }
};

export const deleteUser = async (id: number) => {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result;
};