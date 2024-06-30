import express from 'express'
import jwt from 'jsonwebtoken'
import db from '../db.js'
import bcrypt from 'bcrypt'

const router = express.Router()
const saltRounds = 10

router.post('/sign-up', async (req, res) => {
    const body = req.body

    if (!body.username || !body.password || !body.bio) {
        return res.status(400).send({
            error: "body missing fields"
        })
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const encrypt_pass = bcrypt.hashSync(body.password, salt);

    const user = await db.query("INSERT INTO users(username, password, bio, created) VALUES ($1, $2, $3, $4) RETURNING *", [body.username, String(encrypt_pass), body.bio, new Date()])

    const token = jwt.sign({ user_id: user.rows[0].id }, process.env.JWT_PASS);

    return res.send({
        token: token
    })
})


router.post('/login', async (req, res) => {
    const body = req.body

    if (!body.username || !body.password) {
        return res.status(400).send({
            error: "body missing fields"
        })
    }

    const user = await db.query("SELECT * FROM users WHERE username = $1", [body.username])

    const verified = bcrypt.compareSync(body.password, user.rows[0].password)

    if (verified) {
        const token = jwt.sign({ user_id: user.rows[0].id }, process.env.JWT_PASS);

        return res.send({
            token
        })
    } else {
        return res.status(400).send({
            error: "user not found"
        })
    }
})

export default router;