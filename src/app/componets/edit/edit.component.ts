import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/room';
import { Position } from 'src/app/models/position'
import { PositionsService } from 'src/app/services/position.service';
import { RoomService } from 'src/app/services/room.service';
import { MatSnackBar } from '@angular/material';
import { Employee } from 'src/app/models/employee';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public editEmployee: Employee;
  public id: number;
  private roomOldId: number = null;
  public rooms: Room[];
  public positions: Position[];
  public salaryArray: number[] = [];
  firstFormGroup: FormGroup;
  public position: Position;

  constructor(public employeeService: EmployeeService,
    private route: ActivatedRoute,
    public roomService: RoomService,
    public positionService: PositionsService,
    public _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.compose([Validators.required,
      Validators.maxLength(40)])],
      lastNameCtrl: ['', Validators.compose([Validators.required,
      Validators.maxLength(40)])],
      positionsCtrl: ['', Validators.required],
      salaryCtrl: ['', Validators.required],
      roomCtrl: ['', Validators.required],
    });
    this.rooms = this.roomService.getRoom();
    this.positions = this.positionService.getPosition();

    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.editEmployee = this.employeeService.getEmp(this.id);
    if (this.editEmployee.room) {
      this.roomOldId = this.editEmployee.room;
    }

    this.position = this.positionService.getPositionsbyName(this.editEmployee.position);
    this.setSalary();
  }
  private EditEmployee(): void {
    if (this.roomOldId !== this.editEmployee.room) {
      const room = this.roomService.getRoomById(Number(this.editEmployee.room));
      if (this.roomOldId) {
        const roomOld = this.roomService.getRoomById(Number(this.roomOldId));
        this.roomService.editRoomPerson(roomOld, -1);
      }
      this.roomService.editRoomPerson(room, 1);

    }
    this.employeeService.editEmployee(this.editEmployee);
  }

  private setSalary() {
    this.salaryArray = [];
    this.position = this.positionService.getPositionsbyName(this.editEmployee.position);

    for (let i = +this.position.minWage; i <= +this.position.maxWage; i += 100) {
      this.salaryArray.push(i);
    }
  }

  openSnackBar() {
    this._snackBar.open('Complete!', 'Done', {
      duration: 5000,
      panelClass: ['warning'],
    });
  }

}
