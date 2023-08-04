import express from 'express'
import FavoriteController from '../controllers/Favorite.js'

const router = new express.Router()

router.get('/getone', FavoriteController.getOne)
router.put('/article/:articleId([0-9]+)/append/:quantity([0-9]+)', FavoriteController.append)
router.put('/article/:articleId([0-9]+)/increment/:quantity([0-9]+)', FavoriteController.increment)
router.put('/article/:articleId([0-9]+)/decrement/:quantity([0-9]+)', FavoriteController.decrement)
router.put('/article/:articleId([0-9]+)/remove', FavoriteController.remove)
router.put('/clear', FavoriteController.clear)

export default router