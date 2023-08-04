import ArticleModel from '../models/Article.js'
import AppError from '../errors/AppError.js'

class Article {
    async getAll(req, res, next) {
        try {
            const { categoryId = null, tagId = null } = req.params
            let { limit = null, page = null } = req.query
            limit = limit && /[0-9]+/.test(limit) && parseInt(limit) ? parseInt(limit) : 3
            page = page && /[0-9]+/.test(page) && parseInt(page) ? parseInt(page) : 1
            const options = { categoryId, tagId, limit, page }
            const articles = await ArticleModel.getAll(options)

            res.json(articles)


        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id новости')
            }
            const article = await ArticleModel.getOne(req.params.id)
            res.json(article)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const article = await ArticleModel.create(req.body, req.files?.image)
            res.json(article)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id новости')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const article = await ArticleModel.update(req.params.id, req.body, req.files?.image)
            res.json(article)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id новости')
            }
            const article = await ArticleModel.delete(req.params.id)
            res.json(article)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Article()