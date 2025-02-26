const express = require('express')
const movieRouter = require('./router/movies')
const app = express()
const cors = require('cors')
const { PORT, FE_URL } = process.env
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')
app.use(express.static('public'))

app.use(express.json())
app.use(
  cors({
    origin: FE_URL,
  }),
)
app.use('/movies', movieRouter)
app.use(notFound)
app.use(errorHandler)
app.listen(PORT, () => {})
