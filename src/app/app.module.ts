import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
// Bootstrap
import { MatSidenavModule } from '@angular/material/sidenav';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HeaderComponent } from './layout/header/header.component';
import { TableComponent } from './layout/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { AddEmployeeComponent } from './componets/add-employee/add-employee.component';
import { AboutComponent } from './componets/about/about.component';
import { EditComponent } from './componets/edit/edit.component';
import { EmployeeItemComponent } from './componets/employee-item/employee-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchEmployeeComponent } from './componets/search-employee/search-employee.component';
import { RoomsComponent } from './componets/rooms/rooms.component';
import { PositionsComponent } from './componets/positions/positions.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NgxFloatButtonModule } from 'ngx-float-button';
import { SummaryComponent } from './componets/summary/summary.component';

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
    SummaryComponent,
  ],
  imports: [
    BrowserModule,
    NgxFloatButtonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatSidenavModule,
    RouterTestingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
