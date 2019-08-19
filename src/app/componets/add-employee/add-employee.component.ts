import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from 'src/app/models/employee';
import { Room } from '../../models/room'
import { Position } from '../../models/position'
import { RoomService } from 'src/app/services/room.service';
import { PositionsService } from 'src/app/services/position.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  public firstName: string;
  public position: string;
  public salary: number;
  public lastName: string;
  public room: Room ;
  public rooms: Room[];
  public numbers: number[] = [1000];
  public positions: Position[];
  constructor(
    private employeeService: EmployeeService,
    public roomService: RoomService,
    public positionService: PositionsService) {
    this.rooms = this.roomService.getRoom();
    this.positions = this.positionService.getPosition();
    for (let i = 1100; i <= 8000; i += 100) {     
    this.numbers.push(i);
    }

  }

  ngOnInit() {
  }
  private addEmployee(): void {
    
    this.employeeService.addEmployee(this.firstName, this.lastName, this.position,
      this.salary, this.room);
    this.firstName = '';
    this.lastName = '';
    this.position = '';
    this.room = null;
    this.salary = null;
  }
}
