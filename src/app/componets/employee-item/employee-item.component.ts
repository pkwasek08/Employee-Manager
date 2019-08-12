import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.scss']
})
export class EmployeeItemComponent implements OnInit {
  @Input() employees: Employee;
  
  constructor(private employeeService:EmployeeService) { }

  ngOnInit() {
  }

  private removeEmployee(): void {
    
    this.employeeService.removeEmployee(this.employees.id);
  }
}
