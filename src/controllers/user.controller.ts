import { Request, Response } from 'express';
import * as UserModel from '../models/UserModel';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = await UserModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserModel.createUser(req.body);
    res.status(201).json({ message: 'Usuario creado exitosamente', id: result });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await UserModel.updateUser(id, req.body);
    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await UserModel.deleteUser(id);
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};