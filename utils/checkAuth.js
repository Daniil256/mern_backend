import jwt from "jsonwebtoken";
import { errorProcessing } from "./errorProcessing.js";

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, 'myKey123')
            req.userId = decoded._id
            next()
        } catch (error) {
            errorProcessing(res, error, 403, 'Нет доступа')
        }
    } else {
        errorProcessing(res, error, 403, 'Нет доступа')
    }
}