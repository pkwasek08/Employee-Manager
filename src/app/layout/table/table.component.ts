import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service'
import { EditComponent } from 'src/app/componets/edit/edit.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/room';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  /*@Input()
  private employees:Employee;*/
  public rooms: Room[];
  public room: Room;
  public LowSalary: number;
  public HightSalary: number;

  constructor(public employeeService: EmployeeService,
    public roomService: RoomService) {
    this.rooms = this.roomService.getRoom();
  }

  ngOnInit() {
  }

  private removeEmployee(id: number, roomId: number): void {
    let room = this.roomService.getRoomById(roomId);
    if (room != null) {
      this.roomService.editRoomPerson(room, -1);
    }
    this.employeeService.removeEmployee(id);
  }

  private getRoombyId(id: number): string {
    let roomInfo;
    let room = this.roomService.getRoomById(id);
    if (room != null) {
      roomInfo = room.name + "   " + room.number;
    }
    else
      roomInfo = "null"
    return roomInfo;
  }
}
