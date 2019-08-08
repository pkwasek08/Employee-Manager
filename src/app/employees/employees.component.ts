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
    this.employeeService.getEmployee(1).subscribe(employees => {
      this.employees = employees;
    });
  }

  deleteTodo(employee: Employee)
  {
    //Remove From UI
    this.employees = this.employees.filter(t => t.id !== employee.id);
    //Remove From server
    this.employeeService.deleteEmployee(employee).subscribe();
    console.log('delete from employees');
  }

}
