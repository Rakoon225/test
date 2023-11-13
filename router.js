import Router from 'express';
import postController from './controller/postController.js';

const router = new Router();

router.get('/posts/all', postController.getAll) //все посты

router.post('/posts', postController.create) //создание поста

router.get('/posts/:id', postController.getOne) //определённый пост

router.put('/posts/update', postController.update) //обновление поста

router.delete('/posts/delete/:id', postController.deleteOne) //удаление поста

export default router