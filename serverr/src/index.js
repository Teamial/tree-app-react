import express from 'express'
import { app } from './app.js'
import authentication from './authentication/index.js'
import messages from './messages/index.js'
import ws from './ws/index.js'
import 'dotenv/config'

const PORT = 8080

app.use(express.json())

app.use("/api/auth", authentication)
app.use('/api/chat', messages)
app.use('/ws/chat', ws)

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})

