import jwt from 'jsonwebtoken';

export function authMiddleware(
    req,
    res,
    next
) {

    const authHeader =
        req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            mensaje: 'Debe iniciar sesión'
        });

    }

    const token =
        authHeader.replace(
            'Bearer ',
            ''
        );

    try {

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        req.usuario = decoded;

        next();

    }

    catch (error) {

        return res.status(401).json({
            mensaje: 'Token inválido'
        });

    }

}