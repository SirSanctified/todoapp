import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import appRoutes from './routes/todoApp.js'

dotenv.config()

const port = process.env.PORT || 8000

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/todoapp', appRoutes)

// handle errors
// if the request has been made to an invalid route
app.use((req, res, next) => {
    const error = new Error('Not found')
    res.status = 404
    next(error)
})

// for all other errors including our custom made error
// forwarded from above
app.use((error, req, res, next) => {
    res.status = error.status || 500
    res.json({
        error: error.message
    })
})

async function main() {
    await mongoose.connect(process.env.DBURL)
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}

main()
