
import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

export const jwtCheck = async(req: Request, res: Response, next: Function) => {
    const bearerToken = req.headers['authorization'];
    if(typeof bearerToken === 'undefined') {
        console.error(`No token provided.`);
        res.status(401);
        res.end();
    }
    let token: string = typeof bearerToken === 'undefined' ? "" : bearerToken;
    token = token.substr(7, token.length);
console.log('token', token);
    const authSvc = new AuthService();

    const validToken = await authSvc.validToken(token);

    if(!validToken) {
        console.error('token not valid. whateva');
        // res.status(401);
        // res.end();
    }

    next();
}