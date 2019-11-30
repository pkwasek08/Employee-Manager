import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private employeeService: EmployeeService) {
  }

  public SearchEmployee(firstName: string, position: string, salaryDown: number, salaryUp: number): Employee[] {
    const employees = this.employeeService.getEmployee();
    const searchedEmployee = [];
    for (const empSerach of employees) {
      if (empSerach.firstName === firstName && empSerach.position === position && empSerach.salary >= salaryDown
        && empSerach.salary <= salaryUp) {
        searchedEmployee.push(empSerach);
      }
    }
    return searchedEmployee;
  }

}
