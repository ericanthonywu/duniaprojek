const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {admin} = require('../../models/index')

exports.login = (req, res) => {
    const {username, password} = req.body
    if (username && password) {
        admin.findOne({
            where: {
                username: username
            }
        }).then(data => {
            if (data) {
                bcrypt.compare(password, data.password).then(check => {
                    if (check) {
                        data.password = ""
                        jwt.sign({
                            username: username,
                            role: data.role
                        }, process.env.JWTSECRETKEY, (err, token) => {
                            if (err) {
                                res.status(500).json(err)
                            } else {
                                res.status(200).json({
                                    token: token,
                                    username: username,
                                    role: data.role
                                })
                            }
                        })
                    } else {
                        res.status(403).json()
                    }
                }).catch(err => res.status(500).json(err))
            } else {
                res.status(404).json()
            }
        })
    } else {
        res.status(400).json()
    }
}
