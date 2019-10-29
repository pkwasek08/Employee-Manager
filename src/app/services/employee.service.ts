import { Injectable, ɵEMPTY_ARRAY } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Employee } from '../models/employee';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Observable } from 'rxjs';
import { Room } from '../models/room';
import { RoomService } from './room.service';
import { RoomViewService } from './room-view.service';

//injected http depedency
/*const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}*/
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private temp: number = 0;
  public nextId: number;

  constructor(private roomViewService: RoomViewService) {

    const employees = this.getEmployee();

    if (employees.length !== 0) {

      const maxId = employees[employees.length - 1].id;

      this.nextId = maxId + 1;

    } else {
      this.nextId = 0;
    }

  }

  public addEmployee(firstName: string, lastName: string, position: string, salary: number, room: Room): void {

    const employee = new Employee(this.nextId, firstName, lastName, position, salary, room.id);
    const employees = this.getEmployee();

    //employees[this.nextId] = new Employee (employee.id,employee.firstName);
    employees.push(employee);
    this.setLocalStorageEmployees(employees);
    this.nextId++;
  }
  public getEmployee(): Employee[] {
    const localStorageItem = JSON.parse(localStorage.getItem('employees'));
    return localStorageItem === null ? [] : localStorageItem.employees;
  }
  public getEmp(id: number): Employee {
    const employees = this.getEmployee();

    if (employees === null) {
      return null;
    }
    else {
      for (let i = 0; i < employees.length; i++) {
        if (employees[i].id === id) {
          return employees[i];
        }
      }
    }
    //return localStorageItem === null ? [] : localStorageItem.employees;
  }

  public removeEmployee(id: number): void {
    // let desk = roomViewService.
    let employees = this.getEmployee();
    employees = employees.filter((employee) => employee.id != id);
    this.setLocalStorageEmployees(employees);
  }

  public filtrbyName(): void {
    const employeefiltred = this.getEmployee();
    if (employeefiltred != null) {
      if (this.temp === 0) {
        employeefiltred.sort((a, b) => a.firstName.localeCompare(b.firstName));
        this.setLocalStorageEmployees(employeefiltred);
        this.temp++;
      }
      else {
        this.temp = 0;
        employeefiltred.sort((a, b) => b.firstName.localeCompare(a.firstName));
        this.setLocalStorageEmployees(employeefiltred);
      }
    }
  }

  public filtrbyPosition(): void {
    const employeefiltred = this.getEmployee();
    if (employeefiltred != null) {

      if (this.temp === 0) {
        employeefiltred.sort((a, b) => a.position.localeCompare(b.position));
        this.temp++;
      }
      else {
        this.temp = 0;
        employeefiltred.sort((a, b) => b.position.localeCompare(a.position));
      }
    }
    this.setLocalStorageEmployees(employeefiltred);
  }

  public setLocalStorageEmployees(employees: Employee[]): void {
    localStorage.setItem('employees', JSON.stringify({ employees: employees }));
  }

  public getSearchedEmployee(FirstName: string, position: string, salaryDown: number, salaryUp: number): Employee[] {
    const employees = this.getEmployee();
    const employee = [];
    let j = 0;
    if (employees != null) {
      for (let i = 0; i < employees.length; i++) {
        if (employees[i].firstName === FirstName && employees[i].position === position
          && employees[i].salary >= salaryDown && employees[i].salary <= salaryUp) {
          employee[j] = new Employee(employees[i].id, employees[i].firstName, employees[i].lastName, employees[i].position,
            employees[i].salary, employees[i].room);
          j++;
        }
      }
    }
    return employee;
  }

  public editEmployee(newEmployee: Employee) {
    this.removeEmployee(newEmployee.id);

    const employee = new Employee(newEmployee.id, newEmployee.firstName, newEmployee.lastName, newEmployee.position,
      newEmployee.salary, newEmployee.room);
    const employees = this.getEmployee();
    employees.push(employee);
    this.setLocalStorageEmployees(employees);
  }

  public getEmployeeByIdRoom(id: number) {
    const employees = this.getEmployee();

    if (employees === null) {
      return null;
    } else {
      for (const element in employees) {
        if (employees[element].room === id) {
          return employees[element];
        }
      }
    }
  }
}
