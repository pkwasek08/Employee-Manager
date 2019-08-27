import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxFloatButtonModule } from 'ngx-float-button';
import { FormsModule } from '@angular/forms';
import {MatStepperModule, MatInputModule, MatButtonModule,MatIconModule} from '@angular/material'
import { SvgCircleModule, SvgLineModule, SvgPolygonModule, SvgPolylineModule, SvgTextModule, SvgPathModule, SvgEllipseModule } from 'angular-svg';
import { AppRoutingModule } from './app-routing.module';
import { StorageServiceModule } from 'angular-webstorage-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components
import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './componets/add-employee/add-employee.component';
import { HeaderComponent } from './layout/header/header.component';
import { TableComponent } from './layout/table/table.component';
import { AboutComponent } from './componets/about/about.component';
import { EditComponent } from './componets/edit/edit.component';
import { EmployeeItemComponent } from './componets/employee-item/employee-item.component';
import { SearchEmployeeComponent } from './componets/search-employee/search-employee.component';
import { RoomsComponent } from './componets/rooms/rooms.component';
import { PositionsComponent } from './componets/positions/positions.component';
import { SummaryComponent } from './componets/summary/summary.component';
import { RoomViewComponent } from './componets/room-view/room-view.component';

import { NgxPaginationModule } from 'ngx-pagination';



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
    RoomViewComponent,
  ],
  imports: [
    SvgTextModule, SvgPathModule,
    SvgCircleModule,
    SvgPolylineModule,
    MatStepperModule,
    BrowserModule,
    MatInputModule,
    SvgPolygonModule,
    SvgLineModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    NgxFloatButtonModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
