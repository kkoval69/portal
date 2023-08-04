import TagModel from '../models/Tag.js'
import AppError from '../errors/AppError.js'

class Tag {
    async getAll(req, res, next) {
        try {
            const tags = await TagModel.getAll()
            res.json(tags)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id тега')
            }
            const tag = await TagModel.getOne(req.params.id)
            res.json(tag)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            if (!req.body.name) {
                throw new Error('Нет названия тега')
            }
            const tag = await TagModel.create(req.body)
            res.json(tag)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id тега')
            }
            if (!req.body.name) {
                throw new Error('Нет названия тега')
            }
            const tag = await TagModel.update(req.params.id, req.body)
            res.json(tag)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id тега')
            }
            const tag = await TagModel.delete(req.params.id)
            res.json(tag)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Tag()