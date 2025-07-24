import { Request, Response } from 'express';
import * as Product from '../models/ProductModel';
import { ResultSetHeader } from 'mysql2';

export const getProducts = async (_req: Request, res: Response) => {
  const products = await Product.getAllProducts();
  res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await Product.getProductById(Number(req.params.id));
  if (!product) return res.status(404).json({ message: 'No encontrado' });
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const result = await Product.createProduct(req.body) as ResultSetHeader;
  res.json({ id: result.insertId, ...req.body });
};

export const updateProduct = async (req: Request, res: Response) => {
  await Product.updateProduct(Number(req.params.id), req.body);
  res.json({ message: 'Actualizado correctamente' });
};

export const deleteProduct = async (req: Request, res: Response) => {
  await Product.deleteProduct(Number(req.params.id));
  res.json({ message: 'Eliminado correctamente' });
};
