import CommentsModel from "../models/Сomments.js"
import PostModel from "../models/Post.js"
import { errorProcessing } from "../utils/errorProcessing.js"

export const getAllComments = async (req, res) => {
    try {
        const comments = await CommentsModel.find().populate('user').limit(5).exec()
        res.json(comments)
    } catch (error) {
        errorProcessing(res, error, 500, 'Не удалось загрузить комментарии')
    }
}

export const getComments = async (req, res) => {
    try {
        const postId = req.params.id

        CommentsModel.find(
            { post: postId },
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
        errorProcessing(res, error, 500, 'Не удалось получить coms')
    }
}

export const createComment = async (req, res) => {
    try {
        const doc = new CommentsModel({
            text: req.body.text,
            user: req.userId,
            post: req.body.postId,
        })
        const comment = await doc.save()
        res.json(comment)
        await PostModel.updateOne(
            { _id: req.body.postId },
            { commentsCount: req.body.commentsCount })

    } catch (error) {
        errorProcessing(res, error, 500, 'Не удалось создать коммент')
    }
}