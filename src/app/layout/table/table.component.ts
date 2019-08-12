import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service'


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  /*@Input()
  private employees:Employee;*/

  public LowSalary: number;
  public HightSalary: number;


  constructor(public employeeService:EmployeeService) { 
  }

  
  
  ngOnInit() {
   
}
    

    private removeEmployee(id: number) : void {  
      this.employeeService.removeEmployee(id);
    }

    
}
