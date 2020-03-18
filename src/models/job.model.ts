import { Document, Schema, Model, model } from 'mongoose';
import { IJob } from '../interfaces/job.interface';

export interface IJobModel extends IJob, Document {
  url: String;
}
export const JobSchema: Schema = new Schema({
  title: { type: String, required: true },
  summary: String,
  company: String,
  postDate: String,
  location: { type: String, required: true },
  salary: String,
  createdAt: Date
});

JobSchema.pre('save', next => {
  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});
export const Job: Model<IJobModel> = model<IJobModel>('Job', JobSchema);
