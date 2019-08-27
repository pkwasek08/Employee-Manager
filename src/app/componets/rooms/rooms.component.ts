import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  number: number;
  name: string;
  capacity: number;
  people: number;
  sizeX: number;
  sizeY: number;
  constructor(public roomService: RoomService) { }

  ngOnInit() {
  }

  private addRoom() {
    this.roomService.addRoom(this.number, this.name, this.capacity, this.people, this.sizeX, this.sizeY);
    this.number = null;
    this.name = '';
    this.capacity = null;
    this.people = null;
  }

  private viewRoom(id: number) {
  }
}
