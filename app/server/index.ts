import { NextFunction, Request, Response } from "express"
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const { User } = require('../src/entities/User')
const { getConnectionOptions, createConnection, BaseEntity } = require('typeorm')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.ts')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  const connectionOptions = await getConnectionOptions()
  const connection = await createConnection(connectionOptions)
  BaseEntity.useConnection(connection)

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

app.post("/api/auth/register", jsonParser, async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.name === '' || req.body.password.length < 8 || req.body.password === '') {
    return res.json({ "error": "" })
  }

  const userCheck = await User.findOne({ name: req.body.name })
  if (userCheck) {
    return res.json({ "error": "入力したユーザー名は既に使用されています。" })
  }

  const user = new User()
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(req.body.password, salt)
  user.name = req.body.name
  user.password = hash
  user.save()
    .catch((err: any) => {
      return res.status(400).json({ "error": err.message })
    }) 
  res.json({
    "message": "create User successfully",
    "data": [req.body.name]
  })
})

app.post("/api/auth/login", jsonParser, async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findOne({ name: req.body.name })
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    return res.json({ "error": "ユーザー名もしくはパスワードが違います。" })
  }

  const payload = {
    id: user.id,
    name: user.name,
    imgName: user.imgName
  }
  const token = jwt.sign(payload, process.env.JWT_KEY)
  return res.json({ token })
})

app.get("/api/users", async (req: Request, res: Response) => {
  const users = await User.find()
    .catch((err: any) => {
      return res.status(400).json({ "error": err.message })
    })
  res.send(users)
})

app.get('/api/auth/user', (req: Request, res: Response, next: NextFunction) => {
  const bearToken = req.headers['authorization']
  const bearer = bearToken?.split(' ')
  const token: string = bearer ? bearer[1] : ''

  jwt.verify(token, process.env.JWT_KEY, (err: any, user: any) => {
    return res.json({
      user
    })
  })
})
