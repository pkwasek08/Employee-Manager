import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
//Bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HeaderComponent } from './layout/header/header.component';
import { TableComponent } from './layout/table/table.component';
import { EmployeesComponent } from './employees/employees.component';
import { HttpClientModule }    from '@angular/common/http';
import { AddEmployeeComponent } from './componets/add-employee/add-employee.component';
import { AboutComponent } from './pages/about/about.component';
import { EditComponent } from './pages/edit/edit.component';
import { EmployeeItemComponent } from './componets/employee-item/employee-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchEmployeeComponent } from './componets/search-employee/search-employee.component';
import { RoomsComponent } from './componets/rooms/rooms.component';
import { PositionsComponent } from './componets/positions/positions.component';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    AboutComponent,
    EditComponent,
    EmployeeItemComponent,
    SearchEmployeeComponent,
    RoomsComponent,
    PositionsComponent,
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    RouterTestingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
