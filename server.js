import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import cloudinaryFramework from 'cloudinary'
import multer from 'multer'
import cloudinaryStorage from 'multer-storage-cloudinary'
import dotenv from 'dotenv'
import { FileInput } from './models/fileinput'

dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/code-test"
mongoose.connect(mongoUrl, 
  { useNewUrlParser: true, 
    useUnifiedTopology: true })
mongoose.Promise = Promise

const cloudinary = cloudinaryFramework.v2; 
cloudinary.config({
  cloud_name: 'dpofhliiy',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = cloudinaryStorage({
  cloudinary,
  params: {
    folder: 'files',
    allowedFormats: ['jpg', 'pdf'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }],
  },
})
const parser = multer({ storage })

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('This is a code test for Prototyp.')
})

app.post('/uploads', async (req, res) => {
  try {
    const { username, description } = req.body
    const postedFileinput = await new FileInput({
      username,
      description
    }).save()
    res.status(201).json(postedFileinput)
  } catch (err) {
    res.status(400).json({ message: 'Could not post input', error: err.errors })
  }
})

app.get('/uploads', async (req, res) => {
  try {
    const filesViaInput = await FileInput.find().sort({ createdAt: 'desc' }).exec()
    res.status(201).json(filesViaInput)
  } catch (err) {
    res.status(400).json({ message: 'Cannot get uploads'})
  }
})

app.delete('/uploads/:id', async (req, res) => {
  try {
    await FileInput.findOneAndDelete({ _id: req.params.id })
    res.status(204).json({ message: 'Successful removal' })
  } catch (err) {
    res.status(404).json({
      message: 'Could not delete',
      error: err.errors
    })
  }
})

app.post('/uploads/:id/files', parser.single('file'), async (req, res) => {
  const { id } = req.params
  try {
    const updatedFileinput = await FileInput.findOneAndUpdate(
      { _id: id },
      { files: req.file.path, filename: req.file.filename },
      { new: true })
    res.json(updatedFileinput)
  } catch (err) {
    res.status(400).json({ message: 'Could not post file', error: err.errors })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
