import express from 'express'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

router.get("/:chatroom", (req, res) => {
    const token = req.headers['authorization'] || ""

    jwt.verify(token, process.env.JWT_PASS, async (err, decoded) => {
        if (err) {
            return res.status(400).send({
                error: "user not logged in"
            })
        }

        const chatroom = await db.query("SELECT * FROM chatroom WHERE chatroom_name = $1", [req.params.chatroom])

        if (chatroom.rows.length === 0) {
            return res.status(400).send({
                error: "chatroom not found"
            })
        } else {
            const messages = await db.query("SELECT * FROM messages WHERE chatroom_id = $1 ORDER BY created", [chatroom.rows[0].id])

            return res.send({
                messages: messages.rows.map((message) => ({text: message.text, created: message.created}))
            })
        }
    })
})

router.post("/:chatroom", (req, res) => {
    const token = req.headers['authorization'] || ""
    const body = req.body

    if (!body.text) {
        return res.status(400).send({
            error: "missing message"
        })
    }

    jwt.verify(token, process.env.JWT_PASS, async (err, decoded) => {
        if (err) {
            return res.status(400).send({
                error: "user not logged in"
            })
        }

        const chatroom = await db.query("SELECT * FROM chatroom WHERE chatroom_name = $1", [req.params.chatroom])

        if (chatroom.rows.length === 0) {
            return res.status(400).send({
                error: "chatroom not found"
            })
        } else {
            await db.query("INSERT INTO messages(user_id, chatroom_id, text, created) VALUES ($1, $2, $3, $4)", [decoded.user_id, chatroom.rows[0].id, body.text, new Date()])

            return res.send("success")
        }
    })
})

export default router;