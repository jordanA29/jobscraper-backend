import { Job } from '../models/job.model';

const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({});
    res.send(jobs);
    next();
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

const getJob = async (req, res, next) => {
  const id = req.params.id;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.sendStatus(404);
    }
    res.send(job);
    next();
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

const createJob = async (req, res, next) => {
  const job = new Job(req.body);
  try {
    await job.save();
    res.status(201).send(job);
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

export { getJobs, getJob, createJob };
