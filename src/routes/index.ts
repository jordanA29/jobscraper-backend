import { Router } from 'express';
import ScrapeRoutes from './scrape.routes';
import OfferRoutes from './offer.routes';

const router = Router();

router.use('/scrape', ScrapeRoutes);
router.use('/offers', OfferRoutes);

export default router;
