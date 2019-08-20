import { Injectable, ɵEMPTY_ARRAY } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Employee } from '../models/employee';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Observable } from 'rxjs';
import { Room } from '../models/room';

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

  constructor() {

    const employees = this.getEmployee();

    if (employees != null && employees.length != 0 && employees) {

      let maxId = employees[employees.length - 1].id;

      this.nextId = maxId + 1;

    } else {
      this.nextId = 0;
    }

  }

  public addEmployee(firstName: string, lastName: string, position: string, salary: number, room: Room): void {

    console.log(room);
    
    
    let employee = new Employee(this.nextId, firstName, lastName, position, salary, room);
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
    let employees = this.getEmployee();

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
    let employees = this.getEmployee();
    employees = employees.filter((employee) => employee.id != id);
    this.setLocalStorageEmployees(employees);
  }

  public filtrbyName(): void {
    let employeefiltred = this.getEmployee();
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
    let employeefiltred = this.getEmployee();
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
    let employees = this.getEmployee();
    let employee = [];
    let j = 0;
    if (employees != null) {
      for (let i = 0; i < employees.length; i++) {
        if (employees[i].firstName === FirstName && employees[i].position === position
          && employees[i].salary >= salaryDown && employees[i].salary <= salaryUp) {
          employee[j] = new Employee(employees[i].id, employees[i].firstName, employees[i].lastName, employees[i].position, employees[i].salary, employees[i].room);
          j++;
        }
      }
    }
    return employee;
  }

  public editEmployee(id: number, firstName: string, lastName: string, position: string, salary: number, room: Room) {
    this.removeEmployee(id);
    
    let employee = new Employee(id, firstName, lastName, position, salary, room);
    let employees = this.getEmployee();
    employees.push(employee);
    this.setLocalStorageEmployees(employees);
  }
}
