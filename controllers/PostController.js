import PostModel from "../models/Post.js"
import { errorProcessing } from "../utils/errorProcessing.js"

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()
        const tags = posts.map(obj => obj.tags).flat().slice(0, 5)
        res.json(tags)
    } catch (error) {
        errorProcessing(res, error, 500, 'Не удалось загрузить статью')
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()
        res.json(posts)
    } catch (error) {
        errorProcessing(res, error, 500, 'Не удалось загрузить статью')
    }
}

export const getPost = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { returnDocument: 'after' },
            (error, doc) => {
                if (error) {
                    return errorProcessing(res, error, 500, 'Не удалось получить статью')
                }
                if (!doc) {
                    return errorProcessing(res, 'Статья не найдена', 404, 'Статья не найдена')
                }
                res.json(doc)
            }
        ).populate('user')

    } catch (error) {
        errorProcessing(res, error, 500, 'Не удалось получить статью')
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndDelete({
            _id: postId
        }, (err, doc) => {
            if (err) {
                return errorProcessing(res, error, 500, 'Не удалось удалить статью')
            }
            if (!doc) {
                return errorProcessing(res, false, 404, 'Статья не найдена')
            }
            res.json({ success: true })
        })

    } catch (error) {
        errorProcessing(res, error, 500, 'Не удалось получить статью')
    }
}

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id
        const chanchedAt = new Date()

        await PostModel.updateOne(
            {
                _id: postId
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags.split(','),
                user: req.userId,
                chanchedAt
            },
        )
        res.json({ success: true })


    } catch (error) {
        errorProcessing(res, error, 500, 'Не удалось обновить статью')
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save()

        res.json(post)
    } catch (error) {
        errorProcessing(res, error, 500, 'Не удалось создать статью')
    }
}