import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HeaderComponent } from './layout/header/header.component';
import { TableComponent } from './layout/table/table.component';
<<<<<<< HEAD
<<<<<<< HEAD
import { EmployeesComponent } from './employees/employees.component';
import { HttpClientModule }    from '@angular/common/http';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AboutComponent } from './pages/about/about.component';
import { EditComponent } from './pages/edit/edit.component';
import { EmployeeItemComponent } from './employee-item/employee-item.component';
import { RouterTestingModule } from '@angular/router/testing';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
=======
>>>>>>> parent of 35e7203... table, employees
=======
>>>>>>> parent of 35e7203... table, employees

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
<<<<<<< HEAD
<<<<<<< HEAD
    TableComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    AboutComponent,
    EditComponent,
    EmployeeItemComponent,
=======
    TableComponent
>>>>>>> parent of 35e7203... table, employees
=======
    TableComponent
>>>>>>> parent of 35e7203... table, employees
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    RouterTestingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
