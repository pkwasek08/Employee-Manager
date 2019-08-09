import { Injectable, ɵEMPTY_ARRAY } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Employee } from '../models/employee';
import { Employeejson } from '../database/employeejson'
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Observable } from 'rxjs';

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

  public nextId: number;

  constructor() {

    let employees = this.getEmployee();

    if (employees.length != 0 && employees) {

      let maxId = employees[employees.length - 1].id;

      this.nextId = maxId + 1;
    } else {
      this.nextId = 0;
    }

  }

  public addEmployee(firstName: string, lastName: string, position: string, salary: number, room: number): void {

    let employee = new Employee(this.nextId, firstName, lastName, position, salary, room);
    let employees = this.getEmployee();


    //employees[this.nextId] = new Employee (employee.id,employee.firstName);
    employees.push(employee);

    this.setLocalStorageEmployees(employees);
    this.nextId++;
  }
  public getEmployee(): Employee[] {
    let localStorageItem = JSON.parse(localStorage.getItem('employees'));

    if (localStorageItem === null) {
      return [];
    }
    else {
      return localStorageItem.employees;
    }
    //return localStorageItem === null ? [] : localStorageItem.employees;
  }

  public removeTodo(id: number): void {
    console.log("removefromsservixe");

    let employees = this.getEmployee();
    employees = employees.filter((employee) => employee.id != id);
    this.setLocalStorageEmployees(employees);
  }

  public setLocalStorageEmployees(employees: Employee[]): void {
    localStorage.setItem('employees', JSON.stringify({ employees: employees }));
  }
}
