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

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public editEmployee: Employee;
  public firstName: string;
  public position: string;
  public salary: number;
  public lastName: string;
  public roomId: number;
  public id: number;
  private roomOldId: number;
  public rooms: Room[];
  public numbers: number[] = [1000];
  public positions: Position[];

  constructor(public employeeService: EmployeeService,
    private route: ActivatedRoute,
    public roomService: RoomService,
    public positionService: PositionsService,
    public _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.rooms = this.roomService.getRoom();
    this.positions = this.positionService.getPosition();
    for (let i = 1100; i <= 8000; i += 100) {
      this.numbers.push(i);
    }

    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    let employees = this.employeeService.getEmp(this.id);
    if (employees != null) {
      this.firstName = employees.firstName;
      this.position = employees.position;
      this.lastName = employees.lastName;
      this.roomId = employees.room;
      this.roomOldId = employees.room;
      this.salary = employees.salary;
    }
  }
  private EditEmployee(): void {
    if (this.roomOldId !== this.roomId) {
      const room = this.roomService.getRoomById(this.roomId);
      const roomOld = this.roomService.getRoomById(this.roomOldId);
      this.roomService.editRoomPerson(room, 1);
      this.roomService.editRoomPerson(roomOld, -1);
    }

    this.employeeService.editEmployee(this.editEmployee);
    this.editEmployee = null;
  }

  openSnackBar() {
    this._snackBar.open('Complete!', 'Done', {
      duration: 3000,
      panelClass: ['warning'],
    });

  }
}
