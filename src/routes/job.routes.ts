import { Router } from 'express';
import { getJob, getJobs, createJob } from '../controllers/job.controller';

const router = Router();

router.get('/', getJobs);
router.get('/:id', getJob);
router.post('/', createJob);

export default router;
