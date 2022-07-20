import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import cors from 'cors'

import { checkAuth } from './utils/checkAuth.js'
import { loginValidator, postValidator, registerValidator } from './validation/validators.js'
import { getMe, login, register } from './controllers/UserController.js'
import { create, deletePost, getAllPosts, getLastTags, getPost, updatePost } from './controllers/PostController.js'
import { handleValidationErrors } from './utils/handleValidationErrors.js'

const url = process.env.MONGODB_URI
// const url = 'mongodb+srv://admin:admin@cluster0.xzwaf.mongodb.net/blog?retryWrites=true&w=majority'

mongoose
    .connect(url)
    .then(() => console.log('DataBase Connected!'))
    .catch((err) => console.log(err))

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))


app.post('/auth/login', loginValidator, handleValidationErrors, login)
app.post('/auth/register', registerValidator, handleValidationErrors, register)
app.get('/auth/me', checkAuth, getMe)
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/posts', getAllPosts)
app.get('/posts/:id', getPost)
app.get('/tags', getLastTags)
app.delete('/posts/:id', checkAuth, deletePost)
app.patch('/posts/:id', checkAuth, updatePost)
app.post('/posts', checkAuth, handleValidationErrors, postValidator, create)

app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        console.log(err)
    }
    console.log('Server start!')
}) 