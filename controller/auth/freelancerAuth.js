const {workers} = require('../../models')
const bcrypt = require('bcryptjs')
const nodeMailer = require('nodemailer')
const moment = require('moment')
const jwt = require('jsonwebtoken')

exports.loginFreelancer = (req, res) => {
    const {username, password} = req.body
    if (username && password) {
        workers.findOne({
            where: {
                username: username
            },
            attributes: ['id', 'username', 'password', 'email', 'email_st', 'nohp_st', 'nohp']
        }).then(data => {
            if (data) {
                if (data.email_st) {
                    bcrypt.compare(password, data.password).then(check => {
                        if (check) {
                            jwt.sign({
                                id: data.id,
                                username: data.username,
                                email: data.email,
                                nohp_st: data.nohp_st,
                                nohp: data.nohp,
                            }, process.env.JWTSECRETKEY, (err, token) => {
                                if (err) {
                                    res.status(500).json(err)
                                } else {
                                    data.password = ""
                                    return res.status(200).json({
                                        token: token,
                                        data
                                    })
                                }
                            })
                        } else {
                            res.status(401).json()
                        }
                    }).catch(err => res.status(500).json(err))
                } else {
                    res.status(403).json()
                }
            } else {
                res.status(404).json()
            }
        }).catch(err => res.status(500).json(err))
    } else {
        res.status(400).json()
    }
}

exports.registerFreelancer = (req, res) => {
    const {username, password, email, nohp} = req.body

    if (username && password && email && nohp) {
        bcrypt.hash(password, 10).then(password => {
            const userData = {
                username: username,
                password: password,
                email: email,
                profile_picture: "default.jpg",
                nohp: nohp,
                nohp_st: true //TODO: Remove on Production
            };
            const token = Math.floor((Math.random() * 1000000) + 1); //generate 6 number token
            userData.email_token = token;
            // userData.email_expire_token = moment(Date.now()).add(3, "minutes").toISOString();
            const transpoter = nodeMailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                service: "Gmail",
                requireTLS: true,
                auth: {
                    user: "noreplyerictes@gmail.com",
                    pass: process.env.EmailPassword
                }
            });
            const mailOption = {
                from: "Dunia Projek Email Verification",
                to: email,
                subject: "Email Verification",
                html: `Hello ${username}! Thank you for registering, your token verification is <b>${token}</b>. IMPORTANT! NEVER TELL YOUR TOKEN TO ANYONE!`
            };
            transpoter.sendMail(mailOption, err => {
                if (err) return res.status(500).json({err: err});
            });
            workers.create(userData)
                .then(() => res.status(201).json())
                .catch(err => res.status(500).json({err: err}))

        }).catch(err => res.status(500).json(err))
    } else {
        res.status(400).json()
    }
}

exports.verifyFreelancer = (req, res) => {
    workers.update(
        {
            email_st: true,
        },
        {
            where: {
                email_token: req.body.token,
                email: req.body.email
            }
        }
    ).then(() => res.status(202).json()).catch(err => res.status(500).json(err))
}
