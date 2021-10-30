import { Component, Input, OnInit } from '@angular/core';
import { StakingData } from 'server/classes/staking-data.class';

@Component({
  selector: 'app-stake-info',
  templateUrl: './stake-info.component.html',
  styleUrls: ['./stake-info.component.scss']
})
export class StakeInfoComponent implements OnInit {

  @Input() stakingData!: StakingData;
  
  constructor() { }

  ngOnInit(): void {
  }

}
