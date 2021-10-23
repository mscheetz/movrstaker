export interface StakingData {
    
    totalStaked: number;
    totalReward: number;
    rewards: number[];
    price: number;
    address: string;
    avgRewardHr: number;
    avgRewardDay: number;
    avgRewardHr48: number;
    avgRewardHr24: number;
    avgRewardHr12: number;
    avgRewardHr6: number;
    stakingStart: number;
    now: number;
    stakingHours: number;
    stakingTotalTime: string;
    potentialIntervals: number[];
}