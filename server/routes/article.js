import express from 'express'
import ArticleController from '../controllers/Article.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall/categoryId/:categoryId([0-9]+)/tagId/:tagId([0-9]+)', ArticleController.getAll)

router.get('/getall/categoryId/:categoryId([0-9]+)', ArticleController.getAll)

router.get('/getall/tagId/:tagId([0-9]+)', ArticleController.getAll)

router.get('/getall', ArticleController.getAll)

router.get('/getone/:id([0-9]+)', ArticleController.getOne)

router.post('/create', /*authMiddleware, adminMiddleware,*/ ArticleController.create)

router.put('/update/:id([0-9]+)', /*authMiddleware, adminMiddleware,*/ ArticleController.update)

router.delete('/delete/:id([0-9]+)', /*authMiddleware, adminMiddleware,*/ArticleController.delete)

export default router