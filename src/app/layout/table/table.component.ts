import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service'


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  employees: Employee[];
  constructor(private employeeService:EmployeeService) { }

  

  ngOnInit() {
    this.employeeService.setLocalstorage();
      let key = 'Item 1';  
      this.employees=JSON.parse(localStorage.getItem(key)); 
    }

}
