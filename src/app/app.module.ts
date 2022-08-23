import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SidenavComponent } from './menus/sidenav/sidenav.component';
import { FooterComponent } from './menus/footer/footer.component';
import { HeaderComponent } from './menus/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MypatientsComponent } from './pages/mypatients/mypatients.component';
import { ScheduletimingsComponent } from './pages/scheduletimings/scheduletimings.component';
import { AvailabletimingsComponent } from './pages/availabletimings/availabletimings.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidenavComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    MypatientsComponent,
    ScheduletimingsComponent,
    AvailabletimingsComponent,
    AppointmentsComponent,
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
