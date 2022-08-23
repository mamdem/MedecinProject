import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { AvailabletimingsComponent } from './pages/availabletimings/availabletimings.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MypatientsComponent } from './pages/mypatients/mypatients.component';
import { ScheduletimingsComponent } from './pages/scheduletimings/scheduletimings.component';

const routes: Routes = [
  {path: '',   redirectTo: '/login', pathMatch: 'full'},
  {path: 'dashboard', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'scheduletimings', component: ScheduletimingsComponent},
  {path: 'mypatients', component: MypatientsComponent},
  {path: 'availabletimings', component: AvailabletimingsComponent},
  {path: 'appointments', component: AppointmentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
