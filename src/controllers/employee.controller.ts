import { Request, Response } from 'express';
import * as EmployeeModel from '../models/EmployeeModel';

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await EmployeeModel.getAllEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
};

export const getEmployee = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const employee = await EmployeeModel.getEmployeeById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empleado' });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const result = await EmployeeModel.createEmployee(req.body);
    res.status(201).json({ message: 'Empleado creado exitosamente', id: result });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear empleado' });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await EmployeeModel.updateEmployee(id, req.body);
    res.json({ message: 'Empleado actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar empleado' });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await EmployeeModel.deleteEmployee(id);
    res.json({ message: 'Empleado eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar empleado' });
  }
};