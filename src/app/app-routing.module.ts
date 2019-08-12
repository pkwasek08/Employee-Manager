import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './layout/table/table.component';
import { AddEmployeeComponent } from './componets/add-employee/add-employee.component';
import { AboutComponent } from './pages/about/about.component';
import { EditComponent } from './pages/edit/edit.component';
import { SearchEmployeeComponent } from './componets/search-employee/search-employee.component';
import { RoomsComponent } from './componets/rooms/rooms.component';
import { positionElements } from 'ngx-bootstrap/positioning/public_api';
import { PositionsComponent } from './componets/positions/positions.component';


const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'add', component: AddEmployeeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'edit', component: EditComponent },
  { path: 'search', component: SearchEmployeeComponent },
  { path: 'addRoom', component: RoomsComponent },
  { path: 'posiions', component: PositionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
