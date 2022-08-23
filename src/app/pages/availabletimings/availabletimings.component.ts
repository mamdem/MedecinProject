import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { VariablesService } from 'src/app/globals/variables.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-availabletimings',
  templateUrl: './availabletimings.component.html',
  styleUrls: ['./availabletimings.component.scss']
})
export class AvailabletimingsComponent implements OnInit {

  apiServiceUrl = environment.apiBaseUrl

  availablesTime: any[]

  _date=""

  constructor(public vari: VariablesService,private toastr: ToastrManager, private router: Router, private datepipe: DatePipe,private http: HttpClient) { }

  ngOnInit(): void {
    this.vari.posclick=5
    this.getAllAvailableTime()
  }

  getAllAvailableTime(){
    if(this._date!=""){
      this.http.post<any>(`${this.apiServiceUrl}/rendezvous/available/`,{
        "idmedecin":1,
        "date":this._date,
        "startTime":"09:00",
        "ecartTime":30
      }).subscribe(
        (response: any)=>{
          if(response!=null){
            this.availablesTime = response
          }else{
            this.showError('Erreur serveur', "Veuillez réessayer !")
          }
        },(error: HttpErrorResponse)=>{
          this.showError("Erreur serveur", error.message)
        }
      )
    }
  }


  showSuccess(title: string, desc: string){
    this.toastr.successToastr(desc, title, {
      position: 'top-center'
    });
  }

  showWarning(title: string, desc: string){
    this.toastr.warningToastr(desc, title, {
      position: 'top-center'
    });
  }

  showError(title: string, desc: string){
    this.toastr.errorToastr(desc, title, {
      position: 'top-center'
    });
  }

}
