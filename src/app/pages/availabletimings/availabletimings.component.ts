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
  availablesTimeToSend: any[]
  checks: boolean[]

  _date: any
  _plage: number

  constructor(private toastr: ToastrManager,public vari: VariablesService,private router: Router, private datepipe: DatePipe,private http: HttpClient) { }

  ngOnInit(): void {
    this.vari.posclick=5
    this._date=this.datepipe.transform(new Date(),"yyyy-MM-dd")
    this._plage=30
    this.getAllAvailableTime()    
  }

  saveAvailableTime(){
    this.availablesTimeToSend=[]
    for(let i=0;i<this.checks.length;i++){
      if(this.checks[i]){
        this.availablesTimeToSend.push(this.availablesTime[i])
      }
    }
    if(this.availablesTimeToSend.length>0){
      // var dateIndex = this.getDateIndex(index)
      this.http.post<any>(`${this.apiServiceUrl}/rendezvous/add`, {
        "datecreation":this._date,
        "description":"description",
        "idmedecin":this.vari.personne.idmedecin,
        "idpatient":0,
        "creneaux":this.availablesTimeToSend
      }).subscribe(
        (response: any)=>{
          if(response!=null){
            if(this.availablesTimeToSend.length>1)
              this.showSuccess("Reussi",this.availablesTimeToSend.length+" créneaux ajoutés avec succés !")
            else
              this.showSuccess("Reussi","1 créneau ajouté avec succés !")
            this.getAllAvailableTime()
          }else{
            this.showError('Erreur serveur', "Veuillez réessayer !")
          }
        },(error: HttpErrorResponse)=>{
          this.showError("Erreur serveur", error.message)
        }
      )
    }else{
      this.showWarning("Impossible","Veuillez choisir un créneau horaire !")
    }
    // console.log(this.availablesTimeToSend)
  }

  getAllAvailableTime(){
    if(this._date!=""){
      this.http.post<any>(`${this.apiServiceUrl}/rendezvous/available/`,{
        "idmedecin":1,
        "date":this._date,
        "startTime":"09:00",
        "ecartTime":this._plage
      }).subscribe(
        (response: any)=>{
          if(response!=null){
            this.availablesTime = response
            
            this.checks=[]
            for(let av of response){
              this.checks.push(false)
            }
          }else{
            // this.showError('Erreur serveur', "Veuillez réessayer !")
          }
        },(error: HttpErrorResponse)=>{
          // this.showError("Erreur serveur", error.message)
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
