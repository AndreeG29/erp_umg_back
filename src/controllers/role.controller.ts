import { Request, Response } from 'express';
import * as RoleModel from '../models/RoleModel';
import * as RoleAccessModel from '../models/RoleAccessModel';

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await RoleModel.getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener roles' });
  }
};

export const getRole = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const role = await RoleModel.getRoleById(id);
    if (!role) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener rol' });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const result = await RoleModel.createRole(req.body);
    res.status(201).json({ message: 'Rol creado exitosamente', id: result });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear rol' });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await RoleModel.updateRole(id, req.body);
    res.json({ message: 'Rol actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar rol' });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await RoleModel.deleteRole(id);
    res.json({ message: 'Rol eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar rol' });
  }
};

export const getRolePermissions = async (req: Request, res: Response) => {
  try {
    const roleId = parseInt(req.params.id);
    const permissions = await RoleAccessModel.getRolePermissions(roleId);
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener permisos del rol' });
  }
};