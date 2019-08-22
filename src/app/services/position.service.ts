import { Injectable } from '@angular/core';
import { Position } from '../models/position'
@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  private temp: number = 0;
  public nextId: number ;
  constructor() {

    let positions = this.getPosition();

    if (positions == null && positions.length != 0 && positions) {

      let maxId = positions[positions.length - 1].id;

      this.nextId = maxId + 1;
    } else {
      this.nextId = 0;
    }
   }

  public addPosition( name: string, minWage: number, maxWage: number): void {

    let position = new Position(this.nextId, name, minWage, maxWage);
    let positions = this.getPosition();


    //employees[this.nextId] = new Employee (employee.id,employee.firstName);
    positions.push(position);

    this.setLocalStoragePositions(positions);
    this.nextId++;
  }
  public getPosition(): Position[] {
    let localStorageItem = JSON.parse(localStorage.getItem('positions'));

    if (localStorageItem === null) {
      return [];
    }
    else {
      return localStorageItem.positions;
    }
    //return localStorageItem === null ? [] : localStorageItem.employees;
  }

  public setLocalStoragePositions(positions: Position[]): void {
    localStorage.setItem('positions', JSON.stringify({ positions: positions }));
  }
}

