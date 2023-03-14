const { Router } = require('express');
const router = new Router();
const controller = require('../controllers/controller');
const { check } = require('express-validator');
const roleMD = require('../roleMiddleware');

router.post('/registration', [
    check('Name', 'Имя пользователя не заполнено').notEmpty(),
    check('RoleId', 'Не указана роль пользователя').notEmpty(),
    check('Password', 'Не верная длина пароля (4-13 символов)').isLength({ min: 4, max: 13 })
]
    , controller.registration);
router.post('/login', controller.login);
router.get('/users', roleMD(), controller.users)

module.exports = { router }