import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  constructor() { }

  ngOnInit() {
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
        firstName: 'Piotr',
        lastName: 'Kwasek',
        position: 'praktykant',
        room: 105, // or string
        salary: 0
      },
      {
        id: 3,
        firstName: 'Piotr',
        lastName: 'Kwasek',
        position: 'praktykant',
        room: 105, // or string
        salary: 0
      }
    ]
  }

}
