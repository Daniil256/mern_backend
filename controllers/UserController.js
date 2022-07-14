import jwt from 'jsonwebtoken'
import userModel from '../models/users.js'
import bcrypt from 'bcrypt'
import { errorProcessing } from '../utils/errorProcessing.js'

export const login = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })

        if (!user) {
            return errorProcessing(res, 'Неверный email', 404, 'Неверный email')
        }
        const isValidHash = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if (!isValidHash) {
            return errorProcessing(res, 'Неверный пароль', 404, 'Неверный пароль')
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            'myKey123',
            {
                expiresIn: '30d'
            })

        const { passwordHash, ...userdata } = user._doc

        res.json({
            ...userdata,
            token
        })

    } catch (error) {
        errorProcessing(res, error, 500, 'Ошибка авторизации')
    }
}

export const register = async (req, res) => {
    try {
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new userModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl,
        })

        const user = await doc.save()

        const token = jwt.sign(
            {
                _id: user._id
            },
            'myKey123',
            {
                expiresIn: '30d'
            })
        const { passwordHash, ...userdata } = user._doc

        res.json({
            ...userdata,
            token
        })
    } catch (error) {
        errorProcessing(res, error, 500, 'Ошибка регистрации')
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId)

        if (!user) {
            return errorProcessing(res, error, 500, 'Пользователь не найден')
        }

        const { passwordHash, ...userdata } = user._doc

        res.json(userdata)
    } catch (error) {
        errorProcessing(res, error, 500, 'Пользователь не найден')
    }
}