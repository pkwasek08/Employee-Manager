import { Component, OnInit, Input } from '@angular/core';
import { PositionsService } from 'src/app/services/position.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {

  public name: string;
  @Input() public minWage: number;
  @Input() public maxWage: number;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(public positionsService: PositionsService,
    private _formBuilder: FormBuilder) { }
  registrationForm: FormGroup;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.compose([Validators.required,
      Validators.maxLength(40)])],
      secondCtrl: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'),
      Validators.min(2000), Validators.max(10000)])],
      thirdCtrl: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'),
      Validators.min(2000), Validators.max(10000)])],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }


  private addPositions() {
    this.positionsService.addPosition(this.name, this.minWage, this.maxWage);;
    this.name = '';
    this.minWage = null;
    this.maxWage = null;
  }

}
