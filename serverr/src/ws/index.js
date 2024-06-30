import express from 'express'
import expressWs from 'express-ws'
import { app } from '../app.js'

expressWs(app)

const router = express.Router()

/**
 * 1. first enter chatroom
 * {
 *  message_type: "entering"
 *  user_id: ...
 * }
 *        store the user in a data structure of online users
 *  {
 *  message_type: "leaving"
 *  user_id: ...
 * }
 * 
 * 1. user sends a message
 */

let online_users = []

router.ws('/:chatroom', (ws, req) => {
    const chatroom = req.params.chatroom;
    ws.on('message', msg => {
        const p_msg = JSON.parse(msg)

        if (p_msg.message_type === 'entering') {
            online_users.push({user_id:  p_msg.user_id, chatroom: chatroom, ws: ws})
        } else if (p_msg.message_type === "message") {
            for (let user of online_users) {
                if (user.chatroom === chatroom) {
                    user.ws.send(JSON.stringify({
                        message: p_msg.message
                    }))
                }
            }
        }
        else if (p_msg.message_type === 'leaving') {
            // online_users = online_users.filter(user => user.user_id != p_msg.user_id )
        }
    })
})

export default router