import { Router } from 'express';
import * as dashboardController from '../controllers/dashboard.controller';

const router = Router();

router.get('/sales-by-month', dashboardController.getSalesByMonth);
router.get('/top-products', dashboardController.getTopProducts);
router.get('/stats', dashboardController.getGeneralStats);
router.get('/sales-trend', dashboardController.getSalesTrend);
router.get('/sales-by-category', dashboardController.getSalesByCategory);

export default router;