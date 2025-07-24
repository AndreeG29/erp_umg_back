import { Request, Response } from 'express';
import * as ClientModel from '../models/ClientModel';

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await ClientModel.getAllClients();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

export const getClient = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const client = await ClientModel.getClientById(id);
    if (!client) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const result = await ClientModel.createClient(req.body);
    res.status(201).json({ message: 'Cliente creado exitosamente', id: result });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await ClientModel.updateClient(id, req.body);
    res.json({ message: 'Cliente actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await ClientModel.deleteClient(id);
    res.json({ message: 'Cliente eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};