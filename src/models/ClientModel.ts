import { db } from "../config/db";

export const getAllClients = async () => {
  const [rows] = await db.query('SELECT * FROM clients WHERE state = 1');
  return rows;
};

export const getClientById = async (id: number) => {
  const [rows]: any = await db.query('SELECT * FROM clients WHERE id = ?', [id]);
  return rows[0];
};

export const createClient = async (client: any) => {
  const { name, email, phone, address } = client;
  const [result] = await db.query(
    'INSERT INTO clients (name, email, phone, address,enterprise) VALUES (?, ?, ?, ?)',
    [name, email, phone, address]
  );
  return result;
};

export const updateClient = async (id: number, client: any) => {
  const { name, email, phone, address,enterprise } = client;
  const [result] = await db.query(
    'UPDATE clients SET name = ?, email = ?, phone = ?, address = ?, enterprise = ? WHERE id = ?',
    [name, email, phone, address,enterprise, id]
  );
  return result;
};

export const deleteClient = async (id: number) => {
  const [result] = await db.query('UPDATE clients set state = 0  WHERE id = ?', [id]);
  return result;
};