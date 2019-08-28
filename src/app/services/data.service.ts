import { Injectable } from '@angular/core';
import { Room } from '../models/room';
import { Desk } from '../models/desk';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  desks: Desk;
  room: Room;
  constructor() { }

  getDesks() {
    return this.desks;
  }

  getRoom() {
    return this.room;
  }

  setRoom(room: Room) {
    this.room = room
  }

  public setDesks(desk: Desk) {
    this.desks = desk;
  }
}
