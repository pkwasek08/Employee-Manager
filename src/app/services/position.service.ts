import { Injectable } from '@angular/core';
import { Position } from '../models/position';
@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  private temp = 0;
  public nextId: number;
  constructor() {

    const positions = this.getPosition();

    if (positions.length !== 0) {

      const maxId = positions[positions.length - 1].id;

      this.nextId = maxId + 1;
    } else {
      this.nextId = 0;
    }
  }

  public addPosition(name: string, minWage: number, maxWage: number): void {

    const position = new Position(this.nextId, name, minWage, maxWage);
    const positions = this.getPosition();


    //employees[this.nextId] = new Employee (employee.id,employee.firstName);
    positions.push(position);

    this.setLocalStoragePositions(positions);
    this.nextId++;
  }
  public getPosition(): Position[] {
    const localStorageItem = JSON.parse(localStorage.getItem('positions'));

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

  public getPositionsbyName(names: string) {
    const positions = this.getPosition();
    if (positions) {
      for (const position of positions) {
        if (position.name === names) {
          return position;
        }
      }
    }
    return null;
  }
}

