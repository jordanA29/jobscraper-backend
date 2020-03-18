import scrapeJobOffers from '../services/scrape.service';

const getScrapingResults = async (req, res, next) => {
  try {
    const results = await scrapeJobOffers(req.query.location, req.query.query);
    res.send(results);
    next();
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

export default getScrapingResults;
