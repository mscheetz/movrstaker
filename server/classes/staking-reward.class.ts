export class StakingReward{
    constructor(reward: number, timestamp: number){
        this.reward = reward;
        this.timestamp = timestamp;
    }

    reward: number = 0;
    timestamp: number = 0;
}