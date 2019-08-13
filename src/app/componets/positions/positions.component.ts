import { Component, OnInit } from '@angular/core';
import { PositionsService } from 'src/app/services/position.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {

  public name : string;
  public minWage: number;
  public maxWage: number;
  constructor(public positionsService: PositionsService ) { }

  ngOnInit() {
  }

  private addPositions()
{
  this.positionsService.addPosition(this.name,this.minWage,this.maxWage);;
      this.name = '';
      this.minWage = null;
      this.maxWage = null;
}
}
