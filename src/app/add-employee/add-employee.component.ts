import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  public  firstName: string;
  public position: string;
  public salary: number;
  public lastName: string;
  public room: number;

  constructor(private employeeService: EmployeeService) {
   }

  ngOnInit() {
  }
  private addEmployee(): void {
    
    this.employeeService.addEmployee(this.firstName, this.lastName, this.position, 
      this.salary, this.room);
    this.firstName = '';
  }
}
