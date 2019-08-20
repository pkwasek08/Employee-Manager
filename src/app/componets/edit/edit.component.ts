import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/room';
import { Position } from 'src/app/models/position'
import { PositionsService } from 'src/app/services/position.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public firstName: string;
  public position: string;
  public salary: number;
  public lastName: string;
  public roomId: Room;
  public id: number;
  public rooms: Room[];
  public numbers: number[] = [1000];
  public positions: Position[];

  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    public roomService: RoomService,
    public positionService: PositionsService) {
    this.rooms = this.roomService.getRoom();
    this.positions = this.positionService.getPosition();
    for (let i = 1100; i <= 8000; i += 100) {
      this.numbers.push(i);
    }


    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    let employees = employeeService.getEmp(this.id);
    if (employees != null) {
      this.firstName = employees.firstName;
      this.position = employees.position;
      this.lastName = employees.lastName;
      this.roomId = employees.room;
      this.salary = employees.salary;
    }
  }

  ngOnInit() {
  }
  private EditEmployee(): void {
    this.employeeService.editEmployee(this.id, this.firstName, this.lastName, this.position,
      this.salary, this.roomId);
    this.firstName = '';
    this.lastName = '';
    this.position = '';
    this.roomId = null;
    this.salary = null;
    this.id = null;
  }
}
