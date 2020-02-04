import { Router } from 'express';
import JobRoutes from './job.routes';

const router = Router();

router.use('/jobs', JobRoutes);

export default router;
