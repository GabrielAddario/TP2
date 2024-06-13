import jwt from 'jsonwebtoken';

class TokenController {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    
    login = async (req, res) => {
        try {
            const { username, password } = req.body;
            if (username === 'helloWorld' && password === 'canchaDeFutbol') {
                const token = this.generateToken({ username });
                let fecha = new Date().toDateString();
                res.json({ token: "Bearer "+token, create: fecha, duracion: "1HS" });
            } else {
                res.status(401).json({ code: 401, message: "Unauthorized", moreInformation: 'Usuario o contraseña incorrectos' });
            }
        } catch (error) {
            console.log("ERROR: en login() " + error.message)
        }
    }

    generateToken(payload, options = { expiresIn: '1h' }) {
        return jwt.sign(payload, this.secretKey, options);
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (err) {
            throw new Error('Invalid token');
        }
    }

    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return res.sendStatus(401);

        jwt.verify(token, this.secretKey, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
}

export default TokenController;
