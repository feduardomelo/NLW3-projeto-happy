import { request } from 'express'
import multer from 'multer'
import path from 'path' //bom para fazer caminhos relativos na aplicação


//__dirname retorna o caminho do diretório onde o arquivo upload.ts está
export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}` //nomeando o arquivo

            cb(null, fileName) //Função de callback retorna se houve erro e um parâmetro. Como aqui não teremos erro a primeira entrada é null

        },
    })
}