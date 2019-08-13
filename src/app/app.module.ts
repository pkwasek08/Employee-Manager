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
import { HttpClientModule }    from '@angular/common/http';
import { AddEmployeeComponent } from './componets/add-employee/add-employee.component';
import { AboutComponent } from './componets/about/about.component';
import { EditComponent } from './componets/edit/edit.component';
import { EmployeeItemComponent } from './componets/employee-item/employee-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchEmployeeComponent } from './componets/search-employee/search-employee.component';
import { RoomsComponent } from './componets/rooms/rooms.component';
import { PositionsComponent } from './componets/positions/positions.component';
import {NgxPaginationModule } from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
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
    NgbModule,
    RouterTestingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
