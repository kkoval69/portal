import { Commentary as CommentaryMapping } from './mapping.js'
import { CommentaryItem as CommentaryItemMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Commentary {
    async getAll(userId = null, userEmail = null) {
        const options = {}
        if (userId) {
            options.where = { userId, userEmail }
        }
        if (userEmail) {
            options.where = { userEmail }
        }
        const commentarys = await CommentaryMapping.findAll(options)
        return commentarys
    }

    async getOne(id, userId = null, userEmail = null) {
        const options = {
            where: { id },
            include: [
                { model: CommentaryItemMapping, as: 'items', attributes: ['id', 'name'] },
            ],
        }
        if (userId) options.where.userId = userId
        if (userEmail) options.where.userEmail = userEmail
        const commentary = await CommentaryMapping.findOne(options)
        if (!commentary) {
            throw new Error('комментарий не найден в БД')
        }
        return commentary
    }

    async create(data) {

        const items = data.items
        const { name, userId = null, articleId = null, userEmail = null } = data
        const commentary = await CommentaryMapping.create({
            name, userId, articleId, userEmail
        })
        // новости, входящие в комментарий
        for (let item of items) {
            await CommentaryItemMapping.create({
                name: item.name,
                commentaryId: commentary.id
            })
        }
        // возвращать будем комментарий с составом
        const created = await CommentaryMapping.findByPk(commentary.id, {
            include: [
                { model: CommentaryItemMapping, as: 'items', attributes: ['name'] },
            ],
        })
        return created
    }

    async delete(id) {
        let commentary = await CommentaryMapping.findByPk(id, {
            include: [
                { model: CommentaryItemMapping, attributes: ['name'] },
            ],
        })
        if (!commentary) {
            throw new Error('комментарий не найден в БД')
        }
        await commentary.destroy()
        return commentary
    }
}

export default new Commentary()