import ModelFactory from "../model/DAO/fulbochoFactory.js"

class ReservaService {
    constructor(persistencia) {
        this.reservaModel = ModelFactory.get(persistencia)
    }
    
    obtenerReserva = async (idReserva) => {
        const reserva = await this.reservaModel.obtenerReserva(idReserva)
        return reserva
    }

    guardarReserva = async (reserva) => {
        const reservaGuardada = await this.reservaModel.guardarReserva(reserva)
        return reservaGuardada
    }

    actualizarReserva = async (idReserva, datos) => {
        const reservaActualizada = await this.reservaModel.actualizarReserva(idReserva, datos)
        return reservaActualizada
    }

    eliminarReserva = async (idReserva) => {
        const reservaBorrada = await this.reservaModel.eliminarReserva(idReserva)
        return reservaBorrada
    }
}

export default ReservaService