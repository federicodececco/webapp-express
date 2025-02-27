const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'public/' })
const router = express.Router()
const moviesController = require('../controllers/moviesController')

//index
router.get('/', moviesController.index)
//show
router.get('/:id', moviesController.show)
//post review
router.post('/:id/reviews', moviesController.postReviews)
//post
router.post('/', upload.single('image'), moviesController.post)
module.exports = router
