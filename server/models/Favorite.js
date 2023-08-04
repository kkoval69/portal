import { Favorite as FavoriteMapping } from './mapping.js'
import { Article as ArticleMapping } from './mapping.js'
import { FavoriteArticle as FavoriteArticleMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

const pretty = (favorite) => {
    const data = {}
    data.id = favorite.id
    data.articles = []
    if (favorite.articles) {
        data.articles = favorite.articles.map(item => {
            return {
                id: item.id,
                name: item.name,
                description: item.description,
                quantity: item.favorite_article.quantity
            }
        })
    }
    return data
}

class Favorite {
    async getOne(favoriteId) {
        let favorite = await FavoriteMapping.findByPk(favoriteId, {
            attributes: ['id'],
            include: [
                { model: ArticleMapping, attributes: ['id', 'name', 'description'] },
            ],
        })
        if (!favorite) {
            favorite = await FavoriteMapping.create()
        }
        return pretty(favorite)
    }

    async create() {
        const favorite = await FavoriteMapping.create()
        return pretty(favorite)
    }

    async append(favoriteId, articleId, quantity) {
        let favorite = await FavoriteMapping.findByPk(favoriteId, {
            attributes: ['id'],
            include: [
                { model: ArticleMapping, attributes: ['id', 'name', 'description'] },
            ]
        })
        if (!favorite) {
            favorite = await FavoriteMapping.create()
        }
        // проверяем, есть ли уже эта новость в избр
        const favorite_article = await FavoriteArticleMapping.findOne({
            where: { favoriteId, articleId }
        })
        if (favorite_article) { // есть в избр
            await favorite_article.increment('quantity', { by: quantity })
        } else { // нет в избр
            await FavoriteArticleMapping.create({ favoriteId, articleId, quantity })
        }
        // обновим объект избр, чтобы вернуть свежие данные
        await favorite.reload()
        return pretty(favorite)
    }

    async increment(favoriteId, articleId, quantity) {
        let favorite = await FavoriteMapping.findByPk(favoriteId, {
            include: [{ model: ArticleMapping, as: 'articles' }]
        })
        if (!favorite) {
            favorite = await FavoriteMapping.create()
        }
        // проверяем, есть ли эта новость в избранном
        const favorite_article = await FavoriteArticleMapping.findOne({
            where: { favoriteId, articleId }
        })
        if (favorite_article) {
            await favorite_article.increment('quantity', { by: quantity })
            // обновим объект избранного, чтобы вернуть свежие данные
            await favorite.reload()
        }
        return pretty(favorite)
    }

    async decrement(favoriteId, articleId, quantity) {
        let favorite = await FavoriteMapping.findByPk(favoriteId, {
            include: [{ model: ArticleMapping, as: 'articles' }]
        })
        if (!favorite) {
            favorite = await Favorite.create()
        }
        // проверяем, есть ли эта новость в избранном
        const favorite_article = await FavoriteArticleMapping.findOne({
            where: { favoriteId, articleId }
        })
        if (favorite_article) {
            if (favorite_article.quantity > quantity) {
                await favorite_article.decrement('quantity', { by: quantity })
            } else {
                await favorite_article.destroy()
            }
            // обновим объект избранного, чтобы вернуть свежие данные
            await favorite.reload()
        }
        return pretty(favorite)
    }

    async remove(favoriteId, articleId) {
        let favorite = await FavoriteMapping.findByPk(favoriteId, {
            include: [{ model: ArticleMapping, as: 'articles' }]
        })
        if (!favorite) {
            favorite = await Favorite.create()
        }
        // проверяем, есть ли эта новость в избранном
        const favorite_article = await FavoriteArticleMapping.findOne({
            where: { favoriteId, articleId }
        })
        if (favorite_article) {
            await favorite_article.destroy()
            // обновим объект избранного, чтобы вернуть свежие данные
            await favorite.reload()
        }
        return pretty(favorite)
    }

    async clear(favoriteId) {
        let favorite = await FavoriteMapping.findByPk(favoriteId, {
            include: [{ model: ArticleMapping, as: 'articles' }]
        })
        if (favorite) {
            await FavoriteArticleMapping.destroy({ where: { favoriteId } })
            // обновим объект избранного, чтобы вернуть свежие данные
            await favorite.reload()
        } else {
            favorite = await Favorite.create()
        }
        return pretty(favorite)
    }

    async delete(favoriteId) {
        const favorite = await FavoriteMapping.findByPk(favoriteId, {
            include: [{ model: ArticleMapping, as: 'articles' }]
        })
        if (!favorite) {
            throw new Error('Избранное не найдено в БД')
        }
        await favorite.destroy()
        return pretty(favorite)
    }
}

export default new Favorite()