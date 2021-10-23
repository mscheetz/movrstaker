import axios from "axios";

class CoinGeckoService {
    constructor() {}

    public getPrice = async(symbol: string = "moonriver") => {
        const url = `https://api.coingecko.com/api/v3/coins/${symbol}/tickers?page=1`;

        try {
            const response = await axios.get(url);

            return response.data;
        }catch(err){
            console.log(err);
            return null;
        }
    }
}

export default CoinGeckoService;