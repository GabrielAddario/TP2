import ClimaServicio from '../service/clima.js'

class ClimaController {
    constructor(persistencia) {
        this.climaServicio = new ClimaServicio(persistencia)
    }

    obtenerClima = async (req, res) => {
        try {
            const clima = await this.climaServicio.obtenerClima()
            res.status(200).json({ clima: clima })
        } catch (error) {
            console.log("ERROR: en obtenerClima() " + error.message)
        }
    }
}

export default ClimaController