import { Request, Response } from 'express';
import AuthService from "../services/auth.service"

class LoginController {
    constructor() {}

    static login = async(req: Request, res: Response) => {
        const authSvc = new AuthService();

        const payload = {
            request: 'Show me my MOVR!'
        };

        const jwt = await authSvc.getToken(payload);

        res.set('Authorization', `Bearer ${jwt}`);
        res.status(200).json(jwt);
    }
}

export default LoginController;