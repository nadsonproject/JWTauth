const { UserJWT } = require('../models/model');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');

const generateAccessToken = (id, roles) => {
    const payload = {
        id, 
        roles
    }
    return jwt.sign(payload, process.env.JWT_SECRET_CODE, {expiresIn: "24h"})
}


class UserController {

    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ "code": "Validation ERRORS" })
            }
            const { Name, RoleId, Password } = req.body;
            UserJWT.findAll({
                where: {
                    Name: Name
                }
            })
                .then(result => {
                    if (result.length == 0) {
                        const hashPassword = bcryptjs.hashSync(Password, 6)
                        UserJWT.create({
                            Name: Name,
                            RoleId: RoleId,
                            Password: hashPassword
                        })
                            .then(result => res.send(`User created ${Name}, ${RoleId}, ${hashPassword}`))
                    } else {
                        res.send('User exists')
                    }
                })
        } catch (error) {
            console.log(error);
            res.status(400).json({ "code": "Registration ERROR" })
        }
    }


    async login(req, res) {
        try {
            const { Name, Password } = req.body;
            const existsUser = await UserJWT.findOne({
                where: {
                    Name: Name
                }
            });
            if (!existsUser) {
                res.status(404).json(`code: "User not found"`)
            }
            const validPassword = bcryptjs.compareSync(Password, existsUser.Password)
            if (!validPassword) {
                res.status(400).json(`code: "Wrong password"`)
            }
            const tokenJWT = generateAccessToken(existsUser.Id, existsUser.RoleId)
            return res.json({tokenJWT})

    } catch(error) {
        res.send(error)
    }
}



    async users(req, res) {
    try {
        const getUsers = await UserJWT.findAll();
        return res.send (getUsers)

    } catch (error) {
        console.log(error)
    }
}
}

module.exports = new UserController();