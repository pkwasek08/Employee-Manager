import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
 
  constructor(private employeeService:EmployeeService) { }

  ngOnInit() {
  }

}
