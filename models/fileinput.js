import mongoose from 'mongoose'

export const FileInput = mongoose.model('FileInput', {
  username: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 60
  },
  files: {
    type: String,
    required: true
  },
  filename: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})