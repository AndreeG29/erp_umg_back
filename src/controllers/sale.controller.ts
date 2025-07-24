import { Request, Response } from 'express';
import * as SaleModel from '../models/SaleModel';

export const getSales = async (req: Request, res: Response) => {
  try {
    const sales = await SaleModel.getAllSales();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
};

export const getSale = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const sale = await SaleModel.getSaleWithItems(id);
    if (!sale.id) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener venta' });
  }
};

export const createSale = async (req: Request, res: Response) => {
  try {
    const saleId = await SaleModel.createSale(req.body);
    res.status(201).json({ message: 'Venta creada exitosamente', id: saleId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear venta' });
  }
};

export const updateSale = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await SaleModel.updateSale(id, req.body);
    res.json({ message: 'Venta actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar venta' });
  }
};

export const deleteSale = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await SaleModel.deleteSale(id);
    res.json({ message: 'Venta eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar venta' });
  }
};

export const getSaleItems = async (req: Request, res: Response) => {
  try {
    const saleId = parseInt(req.params.id);
    const items = await SaleModel.getSaleItems(saleId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener items de la venta' });
  }
};