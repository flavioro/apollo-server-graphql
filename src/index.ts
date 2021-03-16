import 'reflect-metadata'
import { config } from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

config()
import startApollo from './configApollo'

async function start() {
  const app = express()

  app.use(cors())
  app.use(morgan('combined'))

  await startApollo(app)

  const port = process.env.PORT || 4000
  app.listen(port, () => {
    console.log(`Your server is running on port ${port}`)
  })
}
start()
