import { Router } from 'express';
import ScrapeRoutes from './scrape.routes';
import JobRoutes from './job.routes';

const router = Router();

router.use('/scrape', ScrapeRoutes);
router.use('/jobs', JobRoutes);

export default router;
