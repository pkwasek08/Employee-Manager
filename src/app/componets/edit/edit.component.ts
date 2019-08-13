import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public firstName: string;
  public position: string;
  public salary: number;
  public lastName: string;
  public room: number;
  public id: number;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    let employees = employeeService.getEmp(this.id);
    if (employees != null) {
      this.firstName = employees.firstName;
      this.position = employees.position;
      this.lastName = employees.lastName;
      this.room = employees.room;
      this.salary = employees.salary;
    }
  }

  ngOnInit() {
  }
  private EditEmployee(): void {
    this.CorrectData();
    this.employeeService.editEmployee(this.id, this.firstName, this.lastName, this.position,
      this.salary, this.room);
    this.firstName = '';
    this.lastName = '';
    this.position = '';
    this.room = null;
    this.salary = null;
    this.id = null;
  }

  private CorrectData() {
    if (this.salary > 5000) this.salary = 5000;
    if (this.salary < 0) this.salary = 0;
    if (this.room > 1000) this.room = 1000;
    if (this.room < 0) this.room = 0;
  }

}
