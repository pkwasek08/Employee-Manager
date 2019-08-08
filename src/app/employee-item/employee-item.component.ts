import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.scss']
})
export class EmployeeItemComponent implements OnInit {
  @Input() employees: Employee;
  @Output() deleteEmployee: EventEmitter<Employee> = new EventEmitter();
 
  
  constructor(private employeeService:EmployeeService) { }

  ngOnInit() {
  }

  
  setClasses() {
    let classes = {
        employees: true,
    }

    return classes;
  }

  
  onDelete(employee) {
    this.deleteEmployee.emit(employee);
    console.log('delete from employees-item');
  }
}
