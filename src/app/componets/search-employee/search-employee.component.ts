import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.scss']
})
export class SearchEmployeeComponent implements OnInit {

  public FirstName:string;
  public positions: string;
  public salaryDown: number;
  public salaryUp:number;
  public temp: boolean = false;

  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
  
  }
    private SearchEmployee(): void
    {
        this.FirstName='';
        this.positions='';
        this.salaryDown=null;
        this.salaryUp = null;
    }

    private removeEmployee(id: number) : void {  
      this.employeeService.removeEmployee(id);
    }

}
