import { Article as ArticleMapping } from './mapping.js'
import { Tag as TagMapping } from './mapping.js'
import { Category as CategoryMapping } from './mapping.js'
import FileService from '../services/File.js'
import AppError from '../errors/AppError.js'

class Article {
    async getAll(options) {
        const { categoryId, tagId, limit, page } = options
        const offset = (page - 1) * limit
        const where = {}
        if (categoryId) where.categoryId = categoryId
        if (tagId) where.tagId = tagId
        const articles = await ArticleMapping.findAndCountAll({
            where,
            limit,
            offset,
            include: [
                { model: TagMapping, as: 'tag' },
                { model: CategoryMapping, as: 'category' }
            ],
            order: [
                ['createdAt', 'DESC'],
            ],
        })
        return articles

    }

    async getOne(id) {
        const article = await ArticleMapping.findByPk(id, {
            include: [
                { model: TagMapping, as: 'tag' },
                { model: CategoryMapping, as: 'category' },
            ]
        })
        if (!article) {
            throw new Error('Новость не найдена в БД')
        }
        return article
    }

    async create(data, img) {
        // поскольку image не допускает null, задаем пустую строку
        const image = FileService.save(img) ?? ''
        const { name, description, categoryId = null, tagId = null, link, created_at } = data
        const article = await ArticleMapping.create({ name, description, image, categoryId, tagId, link, created_at })
        const created = await ArticleMapping.findByPk(article.id)

        return article
    }

    async update(id, data, img) {
        const article = await ArticleMapping.findByPk(id)
        if (!article) {
            throw new Error('Новость не найдена в БД')
        }
        // пробуем сохранить изображение, если оно было загружено
        const file = FileService.save(img)

        // если загружено новое изображение — надо удалить старое
        if (file && article.image) {
            FileService.delete(article.image)
        }

        // подготавливаем данные, которые надо обновить в базе данных
        const {
            name = article.name,
            description = article.description,
            categoryId = article.categoryId,
            tagId = article.tagId,
            image = file ? file : article.image,
            link = article.link

        } = data
        await article.update({ name, description, categoryId, image, tagId, link })
        // обновим объект новости, чтобы вернуть свежие данные
        await article.reload()
        return article
    }

    async delete(id) {
        const article = await ArticleMapping.findByPk(id)
        if (!article) {
            throw new Error('Новость не найдена в БД')
        }
        if (article.image) { // удаляем изображение новости
            FileService.delete(article.image)
        }
        await article.destroy()
        return article
    }


    async isExist(id) {
        const favorite = await ArticleMapping.findByPk(id)
        return favorite
    }
}

export default new Article()