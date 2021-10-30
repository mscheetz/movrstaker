import { Request, Response } from 'express';
import BtcXpubAddress from 'btc-xpub-address';
import * as dotenv from 'dotenv';
import { Addresses } from '../classes/addresses.class';

class AddressController {
    constructor() {
        dotenv.config();
    }

    static getAddresses = async(req: Request, res: Response) => {
        let addresses = new Addresses();
        addresses.btc = await AddressController.deriveBtcAddress();
        addresses.dot = process.env.DOT_ADDRESS!;
        addresses.erc20 = process.env.ERC20_ADDRESS!;
        addresses.xhv = process.env.XHV_ADDRESS!;

        return addresses;
    }
    
    static deriveBtcAddress = async() => {
        const xpub = process.env.BTC_XPUB!;
        const address = await BtcXpubAddress.getAddress(xpub);

        return address;
    }
}

export default AddressController;