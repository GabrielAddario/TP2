import express from 'express';
import RouterCanchaFutbol from './router/canchaFutbol.js';
import RouterToken from './router/token.js';
import CnxMongoDB from './model/DBMongo.js';
import TokenController from './controller/token.js';

class Server {

    constructor(port, persistencia) {
        this.port = port;
        this.persistencia = persistencia;

        this.app = express();
        this.server = null;

        this.secretKey = 'mi_clave_secreta';
        this.tokenService = new TokenController(this.secretKey);
    }

    async start() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(express.static('public'));

        // Middleware de autenticación
        const authenticateToken = (req, res, next) => {
            this.tokenService.authenticateToken(req, res, next);
        };

        this.app.use('/api/canchasDeFutbol', authenticateToken, new RouterCanchaFutbol(this.persistencia).start());
        this.app.use('/api/token', new RouterToken(this.persistencia).start());


        if (this.persistencia === 'MONGODB') {
            await CnxMongoDB.conectar();
        }

        const PORT = 8080;
        this.server = this.app.listen(PORT, () => console.log(`Servidor express escuchando en http://localhost:${PORT}`));

        return this.app;
    }
}

export default Server;
