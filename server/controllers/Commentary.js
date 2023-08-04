import CommentaryModel from '../models/Commentary.js'
import FavoriteModel from '../models/Favorite.js'
import UserModel from '../models/User.js'
import AppError from '../errors/AppError.js'
import ArticleModel from '../models/Article.js'
class Commentary {
    adminCreate = async (req, res, next) => {
        await this.create(req, res, next, 'admin')
    }

    userCreate = async (req, res, next) => {
        await this.create(req, res, next, 'user')
    }

    guestCreate = async (req, res, next) => {
        await this.create(req, res, next, 'guest')
    }

    async create(req, res, next, type) {
        try {
            const { name } = req.body
            // данные для создания комментария
            if (!name) throw new Error('Не указано имя пользователя')

            let items, userId, userEmail, articleId = null, articlesId = []
            console.log(req)
            if (type === 'admin') {
                // когда комментарий делает админ, id пользователя и состав комментария в теле запроса
                if (!req.body.items) throw new Error('Не указан состав комментария')

                if (req.body.items.length === 0) throw new Error('Не указан состав комментария')
                items = req.body.items
                // проверяем существование пользователя
                userId = req.body.userId ?? null
                userEmail = req.body.userEmail ?? null
                if (userId) {
                    await UserModel.getOne(userId, userEmail) // будет исключение, если не найден
                }
                if (userEmail) {
                    await UserModel.getOne(userEmail) // будет исключение, если не найден
                }
            } else {
                // когда комментарий делает обычный пользователь (авторизованный или нет), состав
                // комментарийа получаем из избр, а id пользователя из req.auth.id (если есть)
                if (!req.signedCookies.favoriteId) throw new Error('В избранном пусто')

                const favorite = await FavoriteModel.getOne(parseInt(req.signedCookies.favoriteId))
                // console.log(favorite.articles.map(i => i.id))
                // console.log(await ArticleModel.findByPk(id))
                if (favorite.articles.length === 0) throw new Error('В избранном пусто')
                items = favorite.articles
                favorite.articles.map(i => articleId = i.id)
                userId = req.auth?.id ?? null
                userEmail = req.auth?.email ?? null
            }
            articlesId = await ArticleModel.getOne(1)

            // все готово, можно создавать
            const commentary = await CommentaryModel.create({
                name, items, userId, articleId, userEmail
            })
            await FavoriteModel.clear(parseInt(req.signedCookies.favoriteId))
            res.json(commentary)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async adminGetAll(req, res, next) {
        try {
            const commentarys = await CommentaryModel.getAll()
            res.json(commentarys)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async adminGetUser(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пользователя')
            }
            const commentary = await CommentaryModel.getAll(req.params.id)
            res.json(commentary)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async adminGetOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id комментария')
            }
            const commentary = await CommentaryModel.getOne(req.params.id)
            res.json(commentary)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async adminDelete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id комментария')
            }
            const commentary = await CommentaryModel.delete(req.params.id)
            res.json(commentary)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async userGetAll(req, res, next) {
        try {
            const commentarys = await CommentaryModel.getAll()
            res.json(commentarys)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async userGetOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id комментария')
            }
            const commentary = await CommentaryModel.getOne(req.params.id, req.auth.id)
            res.json(commentary)
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Commentary()