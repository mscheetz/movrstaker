import axios from 'axios';
import * as dotenv from 'dotenv';

class SubscanService {
    private apiKey: string;

    constructor() {
        dotenv.config();
        this.apiKey = process.env.SUBSCAN_API_KEY!;
    }

    public rewards = async(address: string, page: number = 0, rows: number = 20) => {
        const endpoint: string = '/api/scan/account/reward_slash';

        const data: any = {
            row: rows,
            page: page,
            address: address
        };

        return await this.onPost(endpoint, data);
    }

    public staked = async(address: string, page: number = 0, rows: number = 20) => {
        const endpoint: string = '/api/v2/scan/search';

        const data: any = {
            row: rows,
            page: page,
            key: address
        };

        return await this.onPost(endpoint, data);
    }

    private onPost = async(endpoint: string, data: any) => {
        const url: string = `https://moonriver.api.subscan.io${endpoint}`;

        const config = {
            headers: {
                'Content-Type': 'application-json',
                'X-API-Key': this.apiKey
            }
        };

        try {
            const response = await axios.post(url, data, config);

            return response.data;
        } catch(err){
            console.log(err);
            return null;
        }
    }
}

export default SubscanService;