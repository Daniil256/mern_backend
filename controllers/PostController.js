import PostModel from "../models/Post.js"
import { errorProcessing } from "../utils/errorProcessing.js"

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find({}, { tags: 1 }).limit(20).exec()
        const tags = []
        const tagsFilt = []
        posts.map(obj => tags.push(...obj.tags))
        const tagsSort = tags.filter((item, index) => tags.indexOf(item) === index)
        let total = 0
        tagsSort.map(sotrItem => {
            let num = 0
            tags.map(item => {
                if (sotrItem === item) {
                    num++
                }
            })
            if (num > total) {
                total = num
                tagsFilt.unshift(sotrItem)
            } else {
                tagsFilt.push(sotrItem)
            }
        })
        res.json(tagsFilt)
    } catch (error) {
        errorProcessing(res, error, 500, 'Не удалось загрузить теги')
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

export const getPopulatePosts = async (req, res) => {
    try {
        const posts = await PostModel.find().sort({ "commentsCount": -1 }).populate('user').exec()
        res.json(posts)
    } catch (error) {
        errorProcessing(res, error, 500, 'Не удалось загрузить статью')
    }
}

export const getPostsSortByTag = async (req, res) => {
    try {
        const posts = await PostModel.find({ tags: `#${req.params.id}` }).populate('user').exec()
        res.json(posts)
    } catch (error) {
        errorProcessing(res, error, 500, 'Не удалось загрузить статью')
    }
}

export const getPost = async (req, res) => {
    try {
        const user = await PostModel.findOne({ _id: req.params.id }, { viewsCount: { _id: req.body._id } })
        PostModel.findOneAndUpdate(
            { _id: req.params.id },
            !user.viewsCount.length &&
            {
                $push: {
                    viewsCount: {
                        fullName: req.body.fullName,
                        avatarUrl: req.body.avatarUrl,
                        _id: req.body._id,
                    }
                }
            },
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
        PostModel.findOneAndDelete({
            _id: req.params.id
        }, (err, doc) => {
            if (err) {
                return errorProcessing(res, err, 500, 'Не удалось удалить статью')
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
        const changedAt = new Date()

        await PostModel.updateOne(
            {
                _id: req.params.id
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags.split(','),
                user: req.userId,
                changedAt
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