import scrapeJobs from '../services/job.service';

const getJobs = async (req, res, next) => {
  try {
    const result = await scrapeJobs();
    res.send(result);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
};

export default getJobs;
