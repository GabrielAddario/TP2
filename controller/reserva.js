import ReservaService from '../service/reserva.js'

class ReservaController {
    constructor(persistencia) {
        this.reservaServicio = new ReservaService(persistencia)
    }

    obtenerReserva = async (req,res) => {
        try{
            const { idReserva } = req.params
            const reserva = await this.reservaServicio.obtenerReserva(idReserva)
            if(isNaN(reserva)){
                res.status(200).json({code:404, message:"No hay reserva en ese horario"})
            }else{
                res.status(200).json(canchas)
            }
        }catch(error){
            console.log("ERROR: en obtenerReserva() " + error.message)
        }
    }

    guardarReserva = async (req,res) => {
        try {
            const reserva = req.body
            const reservaGuardada = await this.reservaServicio.guardarReserva(reserva)
            res.status(200).json({message: "Reserva guardada correctamente", reservaGuardada})
        }
        catch(error) {
            console.log("ERROR: en generarReserva() " + error.message)
        }
    }

    actualizarReserva = async (req,res) => {
        try{
            const { idReserva } = req.params
            const datos = req.body
            const reservaActualizada = await this.reservaServicio.actualizarReserva(idReserva, datos)
            res.status(200).json({message: "Reserva actualizada correctamente", reservaActualizada: reservaActualizada})
        }catch(error){
            console.log("ERROR: en actualizarReserva() " + error.message)
        }
    }
    

    eliminarReserva = async (req,res) => {
        try{
            const { idReserva } = req.params
            const reservaEliminada = await this.reservaServicio.eliminarReserva(idReserva)
            res.status(200).json({message: "Reserva eliminada correctamente", reservaEliminada: reservaEliminada})
        }catch(error){
            console.log("ERROR: en eliminarReserva() " + error.message)
        }
    }
}

export default ReservaController
