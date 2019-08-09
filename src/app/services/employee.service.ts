import { Injectable } from '@angular/core';
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

  employees: Employee[];
  emp: Employeejson;

  employeesPath: '';

  constructor(private http: HttpClient) { }

  addEmployee()
  {
    let employee = new Employee[]
      let employees = this.getEmployee();
      employees.push()
  }
  getEmployee(): Employee[]{
    let localStorageItem = JSON.parse(localStorage.getItem('Item'))
    return localStorageItem == null ? [] : localStorageItem.Item;
  }

  setLocalstorageEmployees(employees: Employee[]): void {

    localStorage.setItem('Item',JSON.stringify({employees: employees}));
    /*this.employees = [
      {
        id: 1,
        firstName: 'Piotr',
        lastName: 'Kwasek',
        position: 'praktykant',
        room: 105, // or string
        salary: 0
      },
      {
        id: 2,
        firstName: 'Andrzej',
        lastName: 'Metalowiec',
        position: 'praktykant',
        room: 105, // or string
        salary: 0
      },
      {
        id: 3,
        firstName: 'Pudzian',
        lastName: 'Pudzianowski',
        position: 'praktykant',
        room: 105, // or string
        salary: 0
      },
      {
        id: 4,
        firstName: 'Andrzej',
        lastName: 'Metalowiec',
        position: 'praktykant',
        room: 105, // or string
        salary: 0
      },
      {
        id: 5,
        firstName: 'Pudzian',
        lastName: 'Pudzianowski',
        position: 'praktykant',
        room: 105, // or string
        salary: 0
      }
    ];*/
      let key = 'Item 1';
      localStorage.setItem(key, JSON.stringify(this.employees));
    
  }
   // Delete Employee
   deleteEmployee(employee:Employee):Observable<Employee> {
    //const url = `${this.todosUrl}/${todo.id}`;
    let key = employee.id;
    console.log(employee.id);
    
   // localStorage.removeItem(key);
   console.log('deletuje');
   
    return  ;
  }
}
