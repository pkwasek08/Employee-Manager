import { Injectable } from '@angular/core';
import { Room } from '../models/room';
import { Desk } from '../models/desk';
import { RoomViewService } from './room-view.service';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private temp: number = 0;
  public nextId: number;
  constructor(private roomViewService: RoomViewService, private employeeService: EmployeeService) {
    let rooms = this.getRoom();

    if (rooms.length !== 0) {

      let maxId = rooms[rooms.length - 1].id;

      this.nextId = maxId + 1;
    } else {
      this.nextId = 0;
    }
  }

  public removeRoomFull(id: number): void {
    let rooms = this.getRoom();
    rooms = rooms.filter((room) => room.id != id);
    this.setLocalStorageRooms(rooms);
    this.removeDesksByRoomId(id);
    this.setNullRoomInEmployeeAfterRemoveRoom(id);
  }

  public removeRoom(id: number): void {
    let rooms = this.getRoom();
    rooms = rooms.filter((room) => room.id !== id);
    this.setLocalStorageRooms(rooms);
  }

  public addRoom(number: number, name: string, capacity: number, people: number, sizeX: number, sizeY: number): void {

    let room = new Room(this.nextId, number, name, capacity, people, sizeX, sizeY);
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


  public editRoomPerson(room: Room, value: number) {
    this.removeRoom(room.id);
    let newRoom = new Room(room.id, room.number, room.name, room.capacity, room.people + value, room.sizeX, room.sizeY);
    let rooms = this.getRoom();
    rooms.push(newRoom);
    this.setLocalStorageRooms(rooms);
  }

  public getRoomById(id: number): Room {
    const rooms = this.getRoom();
    if (rooms == null) {
      return null;
    }
    else {
      for (let room of rooms) {
        if (room.id == id) {
          return room;
        }
      }
    }
    //return localStorageItem === null ? [] : localStorageItem.employees;
  }

  removeDesksByRoomId(id: number) {
    const desks = this.roomViewService.getDesksByIdRoom(id);
    if (desks != null) {
      for (const element in desks) {
        this.roomViewService.removeDesk(desks[element].id);
      }
    }
  }

  setNullRoomInEmployeeAfterRemoveRoom(id: number) {
    let employee: Employee;
    employee = this.employeeService.getEmployeeByIdRoom(id);
    if (employee !== null) {
      employee.room = null;
      this.employeeService.editEmployee(employee);
    }
  }

}