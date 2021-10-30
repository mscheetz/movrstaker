//import { StakingData } from "server/classes/staking-data.class";
//import { StakingReward } from "server/classes/staking-reward.class";
import { StakingData } from "../interfaces/staking-data.interface"; 
import { StakingReward } from "../interfaces/staking-reward.interface";
import CoinGeckoService from "./coin-geck.service";
import SubscanService from "./subscan.service";

class MovrService {
    private coinGecko: CoinGeckoService;
    private subscan: SubscanService;

    constructor() {
        this.coinGecko = new CoinGeckoService();
        this.subscan = new SubscanService();
    }

    public getAddressDetails = async(address: string) => {
        console.log(`Getting address details for: ${address}`);
        const rewards = await this.getRewards(address);
        const staked = await this.getMovrStaked(address);
        const price = await this.getPrice();

        const datas: StakingData = {
            address: address,
            price: price,
            totalStaked: staked,
            now: Math.floor(Date.now()/1000),
            potentialIntervals: [1, 7, 14, 30, 60, 90, 180, 270, 365, 730],
            rewards: [],
            totalReward: 0,
            stakingStart: 0,
            stakingHours: 0,
            stakingTotalTime: '',
            avgRewardDay: 0,
            avgRewardHr: 0,
            avgRewardHr12: 0,
            avgRewardHr24: 0,
            avgRewardHr48: 0,
            avgRewardHr6: 0
        };
        if(rewards.length > 0) {
            datas.rewards = rewards.map(x => x.reward);
            datas.totalReward = datas.rewards.reduce((tot: number, val: number) => tot + val, 0);
            datas.stakingStart = rewards[rewards.length - 1].timestamp;
            datas.stakingHours = Math.floor((datas.now - datas.stakingStart)/60/60);
            datas.stakingTotalTime = this.getTimeDiff(datas.now - datas.stakingStart);
            if(rewards.length > 0){
                datas.avgRewardHr = datas.rewards.reduce((tot: number, val: number) => tot + val, 0) / rewards.length;
                datas.avgRewardDay = datas.avgRewardHr * 24;
                if(rewards.length > 6) {
                    datas.avgRewardHr6 = datas.rewards.slice(0, 5).reduce((tot: number, val: number) => tot + val, 0) / 6;
                }
                if(rewards.length > 12) {
                    datas.avgRewardHr12 = datas.rewards.slice(0, 11).reduce((tot: number, val: number) => tot + val, 0) / 12;
                }
                if(rewards.length > 24) {
                    datas.avgRewardHr24 = datas.rewards.slice(0, 23).reduce((tot: number, val: number) => tot + val, 0) / 24;
                }
                if(rewards.length > 48) {
                    datas.avgRewardHr48 = datas.rewards.slice(0, 47).reduce((tot: number, val: number) => tot + val, 0) / 48;
                }
            }
        }

        return datas;
    }

    private getTimeDiff(difference: number): string{
        let days = "";
        let hours = "";
        let minutes = "";

        if(difference >= (60*60*24)) {
            const val = Math.floor(difference/60/60/24);
            days = `${val} days `;
            difference -= val*60*60*24;
        }
        if(difference >= (60*60)) {
            const val = Math.floor(difference/60/60);
            hours = `${val} hours `;
            difference -= val*60*60;
        }
        if(difference >= 60) {
            const val = Math.floor(difference/60);
            minutes = `${val} minutes`;
            difference -= val*60;
        }

        return `${days}${hours}${minutes}`;
    }

    public getRewards = async(address: string) => {
        const rewards: StakingReward[] = [];
        let moreRewards: boolean = true;
        let page = 0;
        let rows = 100;

        while (moreRewards) {
            const response = await this.subscan.rewards(address, page, rows);

            if(response !== null && response.message.toLowerCase() === "success" && response.data.count > 0) {
                
                const totalRewards = response.data.count;
                if(rows * (page + 1) >= totalRewards){
                    moreRewards = false;
                }
                
                const subset: StakingReward[] = response.data.list.filter((x: { module_id: string; }) => x.module_id === "parachainstaking");
                
                const rewardSubset = 
                    subset
                    .map((x: any) => {
                        return <StakingReward> { reward: +x.amount / Math.pow(10,18), timestamp:  x.block_timestamp }
                    });

                rewards.push.apply(rewards, rewardSubset);

                page++;
            } else {
                moreRewards = false;
            }
        }

        return rewards;
    }

    public getMovrStaked = async(address: string) => {
        let totalStaked: number = 0;

        const response = await this.subscan.staked(address);
        
        if(response !== null && response.message.toLowerCase() === "success") {
            totalStaked = +response.data.account.reserved / Math.pow(10,18);
        }

        return totalStaked;
    }

    public getPrice = async() => {
        const symbol = 'moonriver';
        let price = 0.0;

        const priceData: any = await this.coinGecko.getPrice(symbol);

        if(priceData != null) {
            price = priceData.tickers[0].converted_last.usd;
        }

        return price;
    }
}

export default MovrService;