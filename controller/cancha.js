import CanchaService from '../service/cancha.js'

class CanchaController {
    constructor(persistencia) {
        this.canchaServicio = new CanchaService(persistencia)
    }

    obtenerCanchas = async (req,res) => {
        try{
            const { localidad } = req.params
            const canchas = await this.canchaServicio.obtenerCanchas(localidad)
            if(isNaN(canchas)){
                res.status(200).json({code:404, message:"No hay canchas para listar"})
            }else{
                res.status(200).json(canchas)
            }
        }catch(error){
            console.log("ERROR: en obtenerCanchas() " + error.message)
        }
    }

    obtenerCancha = async (req,res) => {
        try{
            const { idCancha } = req.params
            const cancha = await this.canchaServicio.obtenerCancha(idCancha)
            if(isNaN(cancha)){
                res.status(200).json({code:404, message:"No hay canchas para listar"})
            }else{
                res.status(200).json(cancha)
            }
        }catch(error){
            console.log("ERROR: en obtenerCanchas() " + error.message)
        }
    }

    obtenerHorariosCancha = async (req,res) => {
        try{
            const { idCancha } = req.params
            const horariosCanchas = await this.canchaServicio.obtenerHorariosCancha(idCancha)
            if(isNaN(horariosCanchas)){
                res.status(200).json({code:404, message:"No hay horarios para esa cancha"})
            }else{
                res.status(200).json(horariosCanchas)
            }
        }catch(error){
            console.log("ERROR: en obtenerHorariosCancha() " + error.message)
        }
    }

    obtenerCalculoValorCancha = async (req,res) => {
        try{
            const { horas } = req.params
            const { idCancha } = req.params
            const precio = await this.canchaServicio.obtenerCalculoValorCancha(horas, idCancha)
            res.status(200).json({precio: precio})
        }catch(error){
            console.log("ERROR: en obtenerCalculoValorCancha() " + error.message)
        }
    }
}

export default CanchaController