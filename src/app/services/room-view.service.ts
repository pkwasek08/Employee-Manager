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
    if (desks == null && desks.length != 0 && desks) {
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


  public getDeskByIdRoom(id: number): Desk[] {
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
    }
    else {
      return deskNewAraay;
    }
  }


  public addDesk(x: number, y: number, rotate: number, idRoom: number): void {
    let desk = new Desk(this.nextId, x, y, rotate, idRoom);
    const desks = this.getDesk();
    desks.push(desk);
    this.setLocalStorageDesks(desks);
    this.nextId++;
  }


  public setLocalStorageDesks(desks: Desk[]): void {
    localStorage.setItem('desks', JSON.stringify({ desks: desks }));
  }


  public editDesk(id: number, x: number, y: number, rotate: number, idRoom: number) {
    this.removeDesk(id);
    let desk = new Desk(id, x, y, rotate, idRoom);
    let desks = this.getDesk();
    desks.push(desk);
    this.setLocalStorageDesks(desks);
  }


  public removeDesk(id: number): void {
    let desks = this.getDesk();
    desks = desks.filter((desk) => desk.id != id);
    this.setLocalStorageDesks(desks);
  }
}