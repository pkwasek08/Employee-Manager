import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  constructor(public roomService:RoomService) { }

  ngOnInit() {
  }

  private removeRoom(id: number): void {
   // let room = this.roomService.getRoomById(roomId);
  //  this.roomService.editRoomPerson(room, -1);
    this.roomService.removeRoomFull(id);
  }
}
