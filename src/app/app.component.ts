import { Component } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { Employee } from './models/employee';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EmployeeManager';

  constructor(public employeeService: EmployeeService)  {} 
}
