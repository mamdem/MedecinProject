import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { VariablesService } from 'src/app/globals/variables.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allSlotToday: any[]

  apiServiceUrl = environment.apiBaseUrl
  patientDirectory = environment.patientDirectory

  constructor(private toastr: ToastrManager,private http: HttpClient, private router: Router, public vari: VariablesService, private global: VariablesService) { }

  ngOnInit(): void {
    this.vari.posclick=1
    if(this.vari.idpers==0)
      this.router.navigateByUrl("/login")
    this.allSlotToday = this.global.allSlotToday
    this.getAllSlotToday()
  }

  getAllSlotToday(){
    this.http.get<any>(`${this.apiServiceUrl}/rendezvous/today/`+this.vari.personne.idmedecin).subscribe(
      (response: any)=>{
        if(response!=null){
          this.allSlotToday=response
          this.global.allSlotToday
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
