import { body } from 'express-validator'

export const registerValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Минимальная длина пароля 5 символов').isLength({ min: 5 }),
    body('fullName', 'Имя должно состоять из минимум трех символов').isLength({ min: 3 }),
    body('avatarUrl', 'Неверная ссылка на аватар').optional().isURL()
]
export const loginValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Минимальная длина пароля 5 символов').isLength({ min: 5 })
]
export const postValidator = [
    body('title', 'Введите название статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 10 }).isString(),
    body('tags', 'Неверный формат тегов').optional().isArray(),
    body('imageUrl', 'Неверная ссылка на картинку').optional().isString(),
    body('test', 'Неверная ссылка на картинку').optional(),
]