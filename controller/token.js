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
                const fecha = new Date().toISOString();
                res.json({ token: `Bearer ${token}`, created: fecha, duration: "1h" });
            } else {
                res.status(401).json({ code: 401, message: "Unauthorized", moreInformation: 'Usuario o contraseña incorrectos' });
            }
        } catch (error) {
            console.error("ERROR: en login() " + error.message);
            res.status(500).json({ code: 500, message: "Internal Server Error", moreInformation: error.message });
        }
    }

    generateToken(payload, options = { expiresIn: '1h' }) {
        return jwt.sign(payload, this.secretKey, options);
    }

    authenticateToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) {
            console.log('No token provided');
            return res.sendStatus(401);
        }

        jwt.verify(token, this.secretKey, (err, user) => {
            if (err) {
                console.log('JWT verification error:', err); 
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
}

export default TokenController;
