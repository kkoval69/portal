import FavoriteModel from '../models/Favorite.js'
import ArticleModel from '../models/Article.js'
import AppError from '../errors/AppError.js'

const maxAge = 60 * 60 * 1000 * 24 * 365
const signed = true

class Favorite {
    async getOne(req, res, next) {
        try {
            let favorite
            if (req.signedCookies.favoriteId) {
                favorite = await FavoriteModel.getOne(parseInt(req.signedCookies.favoriteId))
            } else {
                favorite = await FavoriteModel.create()
            }
            res.cookie('favoriteId', favorite.id, { maxAge, signed })
            res.json(favorite)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async append(req, res, next) {
        try {
            let favoriteId
            if (!req.signedCookies.favoriteId) {
                let created = await FavoriteModel.create()
                favoriteId = created.id
            } else {
                favoriteId = parseInt(req.signedCookies.favoriteId)
            }
            const { articleId, quantity } = req.params
            const favorite = await FavoriteModel.append(favoriteId, articleId, quantity)
            res.cookie('favoriteId', favorite.id, { maxAge, signed })
            res.json(favorite)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async increment(req, res, next) {
        try {
            let favoriteId
            if (!req.signedCookies.favoriteId) {
                let created = await FavoriteModel.create()
                favoriteId = created.id
            } else {
                favoriteId = parseInt(req.signedCookies.favoriteId)
            }
            const { articleId, quantity } = req.params
            const favorite = await FavoriteModel.increment(favoriteId, articleId, quantity)
            res.cookie('favoriteId', favorite.id, { maxAge, signed })
            res.json(favorite)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async decrement(req, res, next) {
        try {
            let favoriteId
            if (!req.signedCookies.favoriteId) {
                let created = await FavoriteModel.create()
                favoriteId = created.id
            } else {
                favoriteId = parseInt(req.signedCookies.favoriteId)
            }
            const { articleId, quantity } = req.params
            const favorite = await FavoriteModel.decrement(favoriteId, articleId, quantity)
            res.cookie('favoriteId', favorite.id, { maxAge, signed })
            res.json(favorite)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async remove(req, res, next) {
        try {
            let favoriteId
            if (!req.signedCookies.favoriteId) {
                let created = await FavoriteModel.create()
                favoriteId = created.id
            } else {
                favoriteId = parseInt(req.signedCookies.favoriteId)
            }
            const favorite = await FavoriteModel.remove(favoriteId, req.params.articleId)
            res.cookie('favoriteId', favorite.id, { maxAge, signed })
            res.json(favorite)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async clear(req, res, next) {
        try {
            let favoriteId
            if (!req.signedCookies.favoriteId) {
                let created = await FavoriteModel.create()
                favoriteId = created.id
            } else {
                favoriteId = parseInt(req.signedCookies.favoriteId)
            }
            favorite = await FavoriteModel.clear(favoriteId)
            res.cookie('favoriteId', favorite.id, { maxAge, signed })
            res.json(favorite)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Favorite()