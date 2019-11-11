const Worker = require('../models/workers')
const bcrypt = require('bcryptjs')
const nodeMailer = require('nodemailer')
const moment = require('moment')

exports.loginFreelancer = (req, res) => {

}

exports.registerFreelancer = (req, res) => {
    const {username, password, email} = req.body

    if (username && password && email) {

        // bcrypt.hash(password, 10).then(hashed_password => {
            const userData = {
                username: username,
                password: password,
                email: email,
                profile_picture: "default.jpg"
            };
            const token = Math.floor((Math.random() * 1000000) + 1); //generate 6 number token
            userData.email_token = token;
            userData.email_expire_token = moment(Date.now()).add(3, "minutes").toISOString();
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
            Worker.create(userData)
                .then(() => res.status(201).json())
                .catch(err => res.status(500).json({err: err}))

        // }).catch(err => res.status(500).json(err))
    } else {
        res.status(403).json()
    }
}
