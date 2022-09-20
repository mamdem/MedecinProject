import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { VariablesService } from 'src/app/globals/variables.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  allSlotsMedecin: any[]
  apiServiceUrl = environment.apiBaseUrl

  constructor(private toastr: ToastrManager,private http: HttpClient, private router: Router, public vari: VariablesService) { }

  ngOnInit(): void {
    this.vari.posclick=2
    this.getAllReservationByMedecin()
  }

  getAllReservationByMedecin(){
    this.http.get<any>(`${this.apiServiceUrl}/reservation/medecin/`+this.vari.personne.idmedecin).subscribe(
      (response: any)=>{
        if(response!=null){
          this.allSlotsMedecin=response
        }else{
          this.showError('Erreur serveur', "Veuillez réessayer !")
        }
      },(error: HttpErrorResponse)=>{
        this.showError("Erreur serveur", error.message)
      }
    )
  }

  validerReservation(idrdv: number, val:number, pos: number, idpatient: number){
    this.http.get<any>(`${this.apiServiceUrl}/rendezvous/action/`+idrdv+`/`+val+`/`+idpatient).subscribe(
      (response: any)=>{
        if(response!=null){
          // this.showSuccess("Succés", "Opération effectuée avec succés")
          this.allSlotsMedecin[pos].status=val
        }else{
          this.showError('Erreur serveur', "Veuillez réessayer !")
        }
      },(error: HttpErrorResponse)=>{
        this.showError("Erreur serveur", error.message)
      }
    )
  }

  updateReservationStatus(idrdv: number, val:number, pos: number, idpatient: number){
    this.http.get<any>(`${this.apiServiceUrl}/rendezvous/action/`+idrdv+`/`+val+`/`+idpatient).subscribe(
      (response: any)=>{
        if(response!=null){
          // this.showSuccess("Succés", "Opération effectuée avec succés")
          this.allSlotsMedecin[pos].status=val
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
