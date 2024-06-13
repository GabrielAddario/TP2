import ModelFactory from "../model/DAO/fulbochoFactory.js"

class CanchaService {
    constructor(persistencia) {
        this.canchaModel = ModelFactory.get(persistencia)
    }
    
    obtenerCanchas = async (localidad) => {
        const canchas = await this.canchaModel.obtenerCanchas(localidad)
        return canchas
    }

    obtenerCancha = async (idCancha) => {
        const cancha = await this.canchaModel.obtenerCancha(idCancha)
        return cancha
    }

    obtenerHorariosCancha = async (idCancha) => {
        const horariosCancha = await this.canchaModel.obtenerHorariosCancha(idCancha)
        return horariosCancha
    }

    obtenerCalculoValorCancha = async (horas, idCancha) => {
        let cancha = await this.canchaModel.obtenerCancha(idCancha)
        let precio = cancha.precio * horas
        return precio
    }   
}

export default CanchaService