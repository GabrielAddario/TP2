import express from 'express'
import TokenController from '../controller/token.js'

class RouterToken {
    constructor(persistencia) {
        this.router = express.Router()
        this.tokenController = new TokenController(persistencia)
    }

    start() {
        //Token
        this.router.post('/generateJWT', this.tokenController.login)

        return this.router
    }
}

export default RouterToken

