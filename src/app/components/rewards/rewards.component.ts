import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {

  @Input() rewards!: number[];

  constructor() { }

  ngOnInit(): void {
  }

}
