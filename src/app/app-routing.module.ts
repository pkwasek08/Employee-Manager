import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './layout/table/table.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AboutComponent } from './pages/about/about.component';
import { EditComponent } from './pages/edit/edit.component';


const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'add', component: AddEmployeeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'edit', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
