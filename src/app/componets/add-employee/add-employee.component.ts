import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from 'src/app/models/employee';
import { Room } from '../../models/room'
import { Position } from '../../models/position'
import { RoomService } from 'src/app/services/room.service';
import { PositionsService } from 'src/app/services/position.service';
import { RouterEvent, RouterLink, RouterLinkActive } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  public firstName: string;
  @Input()
  public position: Position;
  public salary: number;
  public lastName: string;
  public room: Room; //id room
  public rooms: Room[];
  public curUser: Room;
  public salaryArray: number[] = [];
  public positions: Position[];
  firstFormGroup: FormGroup;


  constructor(
    private employeeService: EmployeeService,
    public roomService: RoomService,
    public positionService: PositionsService,
    private _formBuilder: FormBuilder) { }


  ngOnInit() {
    this.rooms = this.roomService.getRoom();
    this.positions = this.positionService.getPosition();

    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.compose([Validators.required,
      Validators.maxLength(40)])],
      lastNameCtrl: ['', Validators.compose([Validators.required,
      Validators.maxLength(40)])],
      positionsCtrl: ['', Validators.required],
      salaryCtrl: ['', Validators.required],
      roomCtrl: ['', Validators.required],
    });
  }
  private addEmployee(): void {
     this.roomService.editRoomPerson(this.room, 1);
 
     this.employeeService.addEmployee(this.firstName, this.lastName, this.position.name,
       this.salary, this.room);
     this.firstName = '';
     this.lastName = '';
     this.position.name = '';
     this.room = null;
     this.salary = null;

  }
  private setSalary() {  
    for (let i = +this.position.minWage; i <= +this.position.maxWage; i += 100) {
      this.salaryArray.push(i);   
     // salaryNumbers.push(i);
    }
  }
}
