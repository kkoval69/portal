import { FavoriteArticle as FavoriteArticleMapping } from './mapping.js'
import { Favorite as FavoriteMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class FavoriteArticle {
    async getAll(favoriteId) {
        const favorite = await FavoriteMapping.findByPk(favoriteId)
        if (!favorite) {
            throw new Error('Избранное не найдено в БД')
        }
        const items = await FavoriteArticleMapping.findAll({ where: { favoriteId } })
        return items
    }

    async getOne(favoriteId, articleId) {
        const favorite = await FavoriteMapping.findByPk(favoriteId)
        if (!favorite) {
            throw new Error('Избранное не найдено в БД')
        }
        const item = await FavoriteArticleMapping.findOne({ where: { favoriteId, articleId } })
        if (!item) {
            throw new Error('Новости нет в избранном')
        }
        return item
    }

    async create(favoriteId, data) {
        const favorite = await FavoriteMapping.findByPk(favoriteId)
        if (!favorite) {
            throw new Error('Избранное не найдено в БД')
        }
        const { quantity = 1 } = data
        const item = await FavoriteArticleMapping.create({ favoriteId, articleId, quantity })
        return item
    }

    async update(favoriteId, articleId, data) {
        const favorite = await FavoriteMapping.findByPk(favoriteId)
        if (!favorite) {
            throw new Error('Избранное не найдено в БД')
        }
        const item = await FavoriteArticleMapping.findOne({ where: { favoriteId, articleId } })
        if (!item) {
            throw new Error('Новости нет в избранном')
        }
        if (data.quantity) {
            await item.update({ quantity })
        } else if (data.increment) {
            await item.increment('quantity', { by: data.increment })
        } else if (data.decrement) {
            await item.decrement('quantity', { by: data.decrement })
        }
        return item
    }

    async delete(favoriteId, articleId) {
        const favorite = await FavoriteMapping.findByPk(favoriteId)
        if (!favorite) {
            throw new Error('Избранное не найдено в БД')
        }
        const item = await FavoriteArticleMapping.findOne({ where: { favoriteId, articleId } })
        if (!item) {
            throw new Error('Новости нет в избранном')
        }
        await item.destroy()
        return item
    }
}

export default new FavoriteArticle()