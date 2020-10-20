import express from 'express'
import path from 'path'
import cors from 'cors' //p/ que api possa ser acessada por um domínio diferente

import 'express-async-errors'

import './database/connection'

import routes from './routes'
import errorHandler from './errors/handler'

const app = express()

app.use(cors())
app.use(express.json()) // p/ express entender json
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
// faz com que as rotas uploads acessem minha pasta local uploads
app.use(errorHandler)

app.listen(3333)

