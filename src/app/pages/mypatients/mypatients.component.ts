import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { VariablesService } from 'src/app/globals/variables.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mypatients',
  templateUrl: './mypatients.component.html',
  styleUrls: ['./mypatients.component.scss']
})
export class MypatientsComponent implements OnInit {

  allConfirmedSlots: any[]
  apiServiceUrl = environment.apiBaseUrl
  patientDirectory = environment.patientDirectory

  constructor(private toastr: ToastrManager,private http: HttpClient, private router: Router, public vari: VariablesService) { }

  ngOnInit(): void {
    this.vari.posclick=3
    this.getAllConfirmedSlots()
  }

  getAllConfirmedSlots(){
    this.http.get<any>(`${this.apiServiceUrl}/rendezvous/status/1`).subscribe(
      (response: any)=>{
        if(response!=null){
          this.allConfirmedSlots=response
        }else{
          this.showError('Erreur serveur', "Veuillez réessayer !")
        }
      },(error: HttpErrorResponse)=>{
        this.showError("Erreur serveur", error.message)
      }
    )
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
