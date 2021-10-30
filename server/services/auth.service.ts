
import * as jwt from 'jsonwebtoken';
import uuid from 'uuid';

class AuthService {
    private tokenSecret: string;

    constructor() {
        this.tokenSecret = process.env.TOKEN_SECRET!;
    }

    public getToken = async(payload: any): Promise<string> => {
        try {
            const oneDay = 60 * 60 * 24;
            const token = jwt.sign(payload, this.tokenSecret);

            return token;
        } catch(err) {
            console.error(err);
            return 'error';
        }
    }

    public validToken = async(token: string): Promise<boolean> => {
        let validity = false;
        let payload: string = "";
        try {
            payload = jwt.verify(token, this.tokenSecret).toString();            
        } catch(err) {
            console.error(err);
        }
        if(payload === 'guest') {
            validity = true;
        }
        return validity;
    }

    public getUuid() {
        return uuid.v4();
    }
}

export default AuthService;