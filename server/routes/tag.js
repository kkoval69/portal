import express from 'express'
import TagController from '../controllers/Tag.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', TagController.getAll)
router.get('/getone/:id([0-9]+)', TagController.getOne)
router.post('/create', /*authMiddleware, adminMiddleware,*/ TagController.create)
router.put('/update/:id([0-9]+)', /*authMiddleware, adminMiddleware,*/ TagController.update)
router.delete('/delete/:id([0-9]+)', /*authMiddleware, adminMiddleware,*/ TagController.delete)

export default router