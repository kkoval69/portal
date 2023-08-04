import express from 'express'
import CommentaryController from '../controllers/Commentary.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

/*
 * только для администратора
 */

// получить список всех комментариев 
router.get(
    '/admin/getall',
    authMiddleware, adminMiddleware,
    CommentaryController.adminGetAll
)
// получить список комментариев пользователя
router.get(
    '/admin/getall/user/:id([0-9]+)',
    authMiddleware, adminMiddleware,
    CommentaryController.adminGetUser
)
// получить комментарий по id
router.get(
    '/admin/getone/:id([0-9]+)',
    authMiddleware, adminMiddleware,
    CommentaryController.adminGetOne
)
// создать новый комментарий
router.post(
    '/admin/create',
    authMiddleware, adminMiddleware,
    CommentaryController.adminCreate
)
// удалить комментарий по id
router.delete(
    '/admin/delete/:id([0-9]+)',
    authMiddleware, adminMiddleware,
    CommentaryController.adminDelete
)

/*
 * для авторизованного пользователя
 */

// получить все комментарийы пользователя
router.get(
    '/user/getall',
    authMiddleware,
    CommentaryController.userGetAll
)
// получить один комментарий пользователя
router.get(
    '/user/getone/:id([0-9]+)',
    authMiddleware,
    CommentaryController.userGetOne
)
// создать новый комментарий
router.post(
    '/user/create',
    authMiddleware,
    CommentaryController.userCreate
)

/*
 * для неавторизованного пользователя
 */

// создать новый комментарий
router.post(
    '/guest/create',
    CommentaryController.guestCreate
)

export default router