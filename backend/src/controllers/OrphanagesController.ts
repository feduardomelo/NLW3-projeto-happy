import {Request, response, Response} from 'express'
import { getRepository } from 'typeorm'
import orphanageView from '../views/orphanages_views'
import * as Yup from 'yup'  //Yup não tem export default por isso é importado assim

import Orphanage from '../models/Orphanages'

// A LÓGICA FICA NO CONTROLLER
// MÉTODOS DO CONTROLLER: INDEX SHOW CREATE UPDATE DELETE

export default {

    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage)

        const orphanages = await orphanagesRepository.find({
            relations: ['images'] //p/ além dos dados do orfanato obter também imgs
        })

        return response.json(orphanageView.renderMany(orphanages))
    },

    async show(request: Request, response: Response) {

        const { id } = request.params

        const orphanagesRepository = getRepository(Orphanage)

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return response.json(orphanageView.render(orphanage))
    },

    // abaixo é a tipagem do typescript
    async create(req: Request, res: Response) {
        //desestruturação do ES
    
    const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
    } = req.body

    const orphanagesRepository = getRepository(Orphanage)

    const requestImages = req.files as Express.Multer.File[] // falando pro codigo que isso é um array de arquivos do multer
    
    const images = requestImages.map(image => {
        return { path: image.filename }
    })

    const data = {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends: open_on_weekends === 'true',
        images
    }

    //Yup é modulo para lidar com obrigações e exceções
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        latitude: Yup.number().required(),
        longitude: Yup.number().required(),
        about: Yup.string().required().max(300),
        instructions: Yup.string().required(),
        opening_hours: Yup.string().required(),
        open_on_weekends: Yup.boolean().required(),
        images: 
            Yup.array(Yup.object().shape({
                path: Yup.string().required()
            })
        )
    })
    
    await schema.validate(data, {
        abortEarly: false,
    })

    const orphanage = orphanagesRepository.create(data)

    await orphanagesRepository.save(orphanage)
    
    return res.status(201).json(orphanage)
    }
}