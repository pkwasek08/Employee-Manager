<<<<<<< HEAD
import { Component, OnInit, Input,EventEmitter,Output, ɵɵqueryRefresh } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service'

=======
import { Component, OnInit } from '@angular/core';
>>>>>>> parent of 35e7203... table, employees

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  employees:Employee[];

  constructor(private employeeService:EmployeeService) { }

  

  ngOnInit() {
    this.employeeService.setLocalstorage();
     // let key = 'Item 1';  
     // this.employees=JSON.parse(localStorage.getItem(key)); 
    this.employeeService.getEmployee(1).subscribe(employees => {
      this.employees=employees;
    })
    }

    onRemove(employees)
    {
      console.log('Item 1['+employees.id+']');
      
      localStorage.removeItem('Item 1[1]');
     // this.deleteEmployee.emit(employees);
      this.employeeService.deleteEmployee(employees);
      console.log('delete from table');
      
    }

    deleteTodo(employee: Employee)
    {
      //Remove From UI
      this.employees = this.employees.filter(t => t.id !== employee.id);
      //Remove From server
      this.employeeService.deleteEmployee(employee).subscribe();
      console.log('delete from table');
    }
  
}
