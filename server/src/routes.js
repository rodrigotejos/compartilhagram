const express = require('express');
const multer = require('multer')
const uploadConfig = require('./config/upload')

const PostController = require('./controllers/PostController.js');
const LikeController = require('./controllers/LikeController.js');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/posts', PostController.index);
routes.post('/posts',upload.single('image'), PostController.store);

routes.get('/posts/:id/like',LikeController.store);

module.exports = routes;