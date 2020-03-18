import { Router } from 'express';
import getScrapingResults from '../controllers/scrape.controller';

const router = Router();

router.get('/', getScrapingResults);

export default router;
