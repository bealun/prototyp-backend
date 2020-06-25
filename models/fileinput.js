import mongoose from 'mongoose'

export const FileInput = mongoose.model('FileInput', {
  username: {
    type: String
  },
  description: {
    type: String
  },
  files: {
    type: String
  },
  filename: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})