import { Document, Schema, Model, model } from 'mongoose'
import { RepositoryInterface } from '../interfaces/repository'

export interface RepositoryModel extends RepositoryInterface, Document {}

const RepositorySchema = new Schema({
  owner: String,
  name: String,
  fullName: String,
  issues: Number,
  avgAge: Number,
  stdAge: Number
}, {
  timestamps: true
})

export const Repository: Model<RepositoryModel> = model<RepositoryModel>('Repository', RepositorySchema)
