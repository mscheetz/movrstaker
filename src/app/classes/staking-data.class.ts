import { RewardFuture } from "./reward-future.class";

export class StakingData {
    constructor() {}

    totalStaked: number = 0;
    totalReward: number = 0;
    rewards: number[] = [];
    price: number = 0;
    address: string = "";    
    avgRewardHr: number = 0;
    avgRewardDay: number = 0;
    avgRewardHr48: number = 0;
    avgRewardHr24: number = 0;
    avgRewardHr12: number = 0;
    avgRewardHr6: number = 0;
    stakingStart: number = 0;
    now: number = 0;
    stakingHours: number = 0;
    stakingTotalTime: string = "";
    potentialIntervals: number[] = [];
    futureRewards: RewardFuture[] = [];
}