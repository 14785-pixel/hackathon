const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const config = require('./config')
const utils = require('./utils')

const app = express()
app.use(cors())
app.use(express.json())

// middleware to verify the token
app.use((request, response, next) => {
  // check if token is required for the API
  if (
    request.url === '/user/login' ||
    request.url === '/user/register'
  ) {
    // skip verifying the token
    next()
  } else {

    const token = request.headers['token']

    if (!token || token.length === 0) {
      response.send(utils.createErrorResult('missing token'))
    } else {
      try {

        const payload = jwt.verify(token, config.secret)

       
        request.userId = payload['id']


        next()
      } catch (ex) {
        response.send(utils.createErrorResult('invalid token'))
      }
    }
  }
})

const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const blogRouter = require("./routes/blog")
app.use('/user', userRouter)
app.use('/category', categoryRouter)
app.use('/blog',blogRouter)
app.listen(4000, '0.0.0.0', () => {
  console.log(`server started on port 4000`)
})
