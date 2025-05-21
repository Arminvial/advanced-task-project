 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mongoose, { Schema, model, models } from 'mongoose'

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending',
    },
    userId: {  
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const TaskModel = models.Task || model('Task', TaskSchema)

export default TaskModel
