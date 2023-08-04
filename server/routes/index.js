import express from 'express'

import article from './article.js'
import category from './category.js'
import tag from './tag.js'
import user from './user.js'
import favorite from './favorite.js'
import commentary from './commentary.js'

const router = new express.Router()

router.use('/article', article)
router.use('/category', category)
router.use('/tag', tag)
router.use('/user', user)
router.use('/favorite', favorite)
router.use('/commentary', commentary)

export default router