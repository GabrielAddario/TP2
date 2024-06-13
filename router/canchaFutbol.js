import express from 'express'
import ReservaController from '../controller/reserva.js'
import CanchaController from '../controller/cancha.js'
import ClimaController from '../controller/clima.js'

class RouterCanchaFutbol {
    constructor(persistencia) {
        this.router = express.Router()
        this.reservaController = new ReservaController(persistencia)
        this.canchaController = new CanchaController(persistencia)
        this.climaController = new ClimaController(persistencia)
    }

    start() {
        
        //Canchas
        this.router.get('/canchasDisponibles/:localidad?', this.canchaController.obtenerCanchas)
        this.router.get('/obtenerCancha', this.canchaController.obtenerCancha)
        this.router.get('/horarioCancha/:id', this.canchaController.obtenerHorariosCancha)
        this.router.get('/calculoValorCancha/:horas/:idCancha', this.canchaController.obtenerCalculoValorCancha)
        
        //Clima
        this.router.get('/consultarClima', this.climaController.obtenerClima)
        
        //Reserva
        this.router.get('/obtenerResrva/:idReserva', this.reservaController.obtenerReserva)
        this.router.post('/generarReserva', this.reservaController.guardarReserva)
        this.router.put('/actualizarReserva/:idReserva', this.reservaController.actualizarReserva)
        this.router.delete('/eliminarReserva/:idReserva', this.reservaController.eliminarReserva)

        return this.router
    }
}

export default RouterCanchaFutbol

