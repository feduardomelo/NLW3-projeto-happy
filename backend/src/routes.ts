import { Router } from 'express'
import multer, {} from 'multer'

import uploadConfig from './config/upload'
import OrphanagesController from './controllers/OrphanagesController'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.post('/orphanages', upload.array('images'), OrphanagesController.create)
// a linha acima diz o seguinte: na rota faça o upload de vários arquivos e os chame de "images" e depois faz o método create

export default routes;