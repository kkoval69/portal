import { Tag as TagMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Tag {
    async getAll() {
        const tags = await TagMapping.findAll({
            commentary: [
                ['name', 'ASC'],
            ],
        })
        return tags
    }

    async getOne(id) {
        const tag = await TagMapping.findByPk(id)
        if (!tag) {
            throw new Error('Тег не найден в БД')
        }
        return tag
    }

    async create(data) {
        const { name } = data
        const exist = await TagMapping.findOne({ where: { name } })
        if (exist) {
            throw new Error('Такой тег уже есть')
        }
        const tag = await TagMapping.create({ name })
        return tag
    }

    async update(id, data) {
        const tag = await TagMapping.findByPk(id)
        if (!tag) {
            throw new Error('Тег не найден в БД')
        }
        const { name = tag.name } = data
        await tag.update({ name })
        return tag
    }

    async delete(id) {
        const tag = await TagMapping.findByPk(id)
        if (!tag) {
            throw new Error('Тег не найден в БД')
        }
        await tag.destroy()
        return tag
    }
}

export default new Tag()