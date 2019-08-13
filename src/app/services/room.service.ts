import { Injectable } from '@angular/core';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private temp: number = 0;
  public nextId: number ;

  constructor() { 
    let rooms = this.getRoom();

    if (rooms.length != 0 && rooms) {

      let maxId = rooms[rooms.length - 1].id;

      this.nextId = maxId + 1;
    } else {
      this.nextId = 0;
    }
  }

  public addRoom(number: number, name: string, capacity: number, people: number): void {

    let room = new Room(this.nextId, number, name, capacity, people);
    let rooms = this.getRoom();


    //employees[this.nextId] = new Employee (employee.id,employee.firstName);
    rooms.push(room);

    this.setLocalStorageRooms(rooms);
    this.nextId++;
  }
  public getRoom(): Room[] {
    let localStorageItem = JSON.parse(localStorage.getItem('rooms'));

    if (localStorageItem === null) {
      return [];
    }
    else {
      return localStorageItem.rooms;
    }
    //return localStorageItem === null ? [] : localStorageItem.employees;
  }

  public setLocalStorageRooms(rooms: Room[]): void {
    localStorage.setItem('rooms', JSON.stringify({ rooms: rooms }));
  }

}