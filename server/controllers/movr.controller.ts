import { Request, Response } from 'express';
import MovrService from '../services/movr.service';

class MovrController {
    constructor() {
    }

    static getData = async(req: Request, res: Response) => {
        const address = req.params.address;
        console.log(`New address request: ${address}`);
        const svc = new MovrService();
        
        const rewards = await svc.getAddressDetails(address);

        res.json(rewards);
    }
}

export default MovrController;