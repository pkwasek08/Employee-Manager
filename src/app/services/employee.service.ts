import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Employee } from '../models/employee';
import { Employeejson } from '../database/employeejson'
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
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

  }
  getEmployee(temp) {
    let value;
    for (let i = 0; i < localStorage.length; i++){
      let key = localStorage.key(i);
      //let item = JSON.parse(localStorage.getItem(key));
     value =  JSON.parse(localStorage.getItem(key));
      console.log(key, value);
    }
    return value;
  }

  setLocalstorage(): void {
    this.employees = [
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
    ];
      let key = 'Item 1';
      localStorage.setItem(key, JSON.stringify(this.employees));
    
  }
}
