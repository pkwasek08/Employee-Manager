import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Position } from 'src/app/models/position'
import { PositionsService } from 'src/app/services/position.service';
import { min } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';
import { Employee } from 'src/app/models/employee';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.scss']
})
export class SearchEmployeeComponent implements OnInit {

  public salaryDown: number;
  public firstName: string;
  public position: string;
  public salaryUp: number;
  public isFound = false;
  public positions: Position[];
  public searchedEmployee: Employee[];
  isLinear = true;

  firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;

  constructor(
    public employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    public positionService: PositionsService,
    public searchService: SearchService,
    public roomService: RoomService) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.compose([Validators.required,
      Validators.maxLength(40)])],
      positionsCtrl: ['', Validators.required],
      salaryUpCtrl: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.max(20000)])],
      salaryDownCtrl: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(this.salaryDown + 1),
      Validators.max(20000)])],
    });

    this.positions = this.positionService.getPosition();
  }

  private SearchEmployee(): void {
    if (this.firstFormGroup.valid) {
      this.searchedEmployee = this.searchService.SearchEmployee(this.firstName, this.position, this.salaryDown, this.salaryUp);
      if (this.searchedEmployee) {
        this.isFound = true;
      }
    }
  }

  private removeEmployee(id: number): void {
    this.employeeService.removeEmployee(id);
  }

  private SetValidatorofSalary(): void {
    this.firstFormGroup.controls['salaryUpCtrl'].setErrors(null);
    this.firstFormGroup.controls['salaryDownCtrl'].setErrors(null);
    if (this.salaryDown) {
      this.firstFormGroup.controls['salaryUpCtrl'].setValidators([Validators.min(this.salaryDown), Validators.compose([Validators.required,
      Validators.pattern('^[0-9]+$'), Validators.max(20000)])]);
    }
    if (this.salaryUp) {
      this.firstFormGroup.controls['salaryDownCtrl'].setValidators([Validators.max(this.salaryUp), Validators.compose([Validators.required,
      Validators.pattern('^[0-9]+$')])]);
    }
    this.firstFormGroup.controls['salaryUpCtrl'].updateValueAndValidity();
    this.firstFormGroup.controls['salaryDownCtrl'].updateValueAndValidity();
  }

  private getRoombyId(id: number): string {
    let roomInfo;
    let room = this.roomService.getRoomById(id);
    if (room) {
      roomInfo = room.name + "   " + room.number;
    }
    else {
      roomInfo = "null"
    }
    return roomInfo;
  }
  
}
