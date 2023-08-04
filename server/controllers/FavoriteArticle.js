import FavoriteArticleModel from '../models/FavoriteArticle.js'
import AppError from '../errors/AppError.js'

const check = async (req, res, next) => {
    try {
        if (!req.signedCookies.favoriteId) {
            throw new Error('Избранное еще не создано')
        }
        const exist = await FavoriteModel.isExist(req.signedCookies.favoriteId)
        if (!exist) {
            res.clearCookie('favoriteId')
            throw new Error('Избранное не найдено в БД')
        }
    } catch (e) {
        next(AppError.badRequest(e.message))
    }
}

class FavoriteArticle {
    async getAll(req, res, next) {
        await check(req, res, next) // проверяем существование избранного
        try {
            const articles = await FavoriteArticleModel.getAll(req.signedCookies.favoriteId)
            res.json(articles)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        await check(req, res, next) // проверяем существование избранного
        try {
            if (!req.params.articleId) {
                throw new Error('Не указан id новости')
            }
            const item = await FavoriteArticleModel.create(
                req.signedCookies.favoriteId,
                req.params.articleId,
                req.body
            )
            res.json(item)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        await check(req, res, next) // проверяем существование избранного
        try {
            if (!req.params.articleId) {
                throw new Error('Не указан id новости')
            }
            const item = await FavoriteArticleModel.update(
                req.signedCookies.favoriteId,
                req.params.articleId,
                req.body
            )
            res.json(item)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        await check(req, res, next) // проверяем существование избр
        try {
            if (!req.params.articleId) {
                throw new Error('Не указан id новости')
            }
            const item = await FavoriteArticleModel.delete(
                req.signedCookies.favoriteId,
                req.params.articleId,
            )
            res.json(item)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new FavoriteArticle()