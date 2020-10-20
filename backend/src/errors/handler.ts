import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

interface ValidationErrors {
    [key: string]: string[] // a chave é uma string e o tipo é um array de string
}

const errorHandler:ErrorRequestHandler = (error, request, response, next) => {

    if (error instanceof ValidationError) {
        let errors: ValidationErrors = {}

        error.inner.forEach(err => {
            errors[err.path] = err.errors
        })

        return response.status(400).json({ message: 'Validation fails', errors })

    }
    console.error(error) //isso mostra o erro só pra mim

    return response.status(500).json({ message: 'Internal server error' })
}

export default errorHandler