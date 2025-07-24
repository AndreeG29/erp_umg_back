import { Request, Response } from 'express';
import * as DashboardModel from '../models/DashboardModel';

export const getSalesByMonth = async (req: Request, res: Response) => {
  try {
    const year = req.query.year ? parseInt(req.query.year as string) : undefined;
    const data = await DashboardModel.getSalesByMonth(year);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ventas por mes' });
  }
};

export const getTopProducts = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
    const data = await DashboardModel.getTopProducts(limit);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos más vendidos' });
  }
};

export const getGeneralStats = async (req: Request, res: Response) => {
  try {
    const data = await DashboardModel.getGeneralStats();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadísticas generales' });
  }
};

export const getSalesTrend = async (req: Request, res: Response) => {
  try {
    const data = await DashboardModel.getSalesTrend();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tendencia de ventas' });
  }
};

export const getSalesByCategory = async (req: Request, res: Response) => {
  try {
    const months = req.query.months ? parseInt(req.query.months as string) : 7;
    const data = await DashboardModel.getSalesByCategory(months);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ventas por categoría' });
  }
};