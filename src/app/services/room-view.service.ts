import { Injectable } from '@angular/core';
import { Desk } from '../models/desk';

@Injectable({
  providedIn: 'root'
})
export class RoomViewService {

  public desks: Desk[];
  public nextId: number;
  constructor() {

    let desks = this.getDesk();
    if (desks.length !== 0) {
      let maxId = desks[desks.length - 1].id;
      this.nextId = maxId + 1;
    } else {
      this.nextId = 0;
    }
  }

  public getDesk(): Desk[] {
    let localStorageItem = JSON.parse(localStorage.getItem('desks'));
    if (localStorageItem === null) {
      return [];
    }
    else {
      return localStorageItem.desks;
    }
    //return localStorageItem === null ? [] : localStorageItem.employees;
  }


  public getDesksByIdRoom(id: number): Desk[] {
    let desks = this.getDesk();
    let deskNewAraay: Desk[] = [];
    for (let i = 0; i < desks.length; i++) {
      if (desks[i] != null) {
        if (desks[i].idRoom === id) {
          deskNewAraay.push(desks[i])
        }
      }
    }
    if (deskNewAraay == null) {
      return [];
    } else {
      return deskNewAraay;
    }
  }

  public getDeskByEmployeeId(id: number): Desk {
    const desks = this.getDesk();
    for (const desk of desks) {
      if (desk.idEmployee === id) {
        return desk;
      }
    }
    return null;
  }

  public addDesk(x: number, y: number, rotate: number, idRoom: number, idEmployee: number): void {
    const desk = new Desk(this.nextId, x, y, rotate, idRoom, idEmployee);
    const desks = this.getDesk();
    desks.push(desk);
    this.setLocalStorageDesks(desks);
    this.nextId++;
  }


  public setLocalStorageDesks(desks: Desk[]): void {
    localStorage.setItem('desks', JSON.stringify({ desks: desks }));
  }


  public editDesk(id: number, x: number, y: number, rotate: number, idRoom: number, idEmployee: number) {
    this.removeDesk(id);
    const desk = new Desk(id, x, y, rotate, idRoom, idEmployee);
    const desks = this.getDesk();
    desks.push(desk);
    this.setLocalStorageDesks(desks);
  }


  public removeDesk(id: number): void {
    let desks = this.getDesk();
    desks = desks.filter((desk) => desk.id !== id);
    this.setLocalStorageDesks(desks);
  }
}