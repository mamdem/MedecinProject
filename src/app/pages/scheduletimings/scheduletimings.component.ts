import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { VariablesService } from 'src/app/globals/variables.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scheduletimings',
  templateUrl: './scheduletimings.component.html',
  styleUrls: ['./scheduletimings.component.scss']
})
export class ScheduletimingsComponent implements OnInit {

  _number=1
  search=""

  lesinputs=[{"heuredebut":"", "heurefin":"", "idpatient":0}]
  
  curr=null
  dateWeek=null
  days:  string[]=["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
  allSlots: any[]

  posSlot:number=0

  apiServiceUrl = environment.apiBaseUrl
  

  constructor( private router: Router, public vari: VariablesService, private datepipe: DatePipe,private http: HttpClient) { }

  ngOnInit(): void {
    this.posSlot = this.getDiffDays()
    this.vari.posclick=4
    this.getAllSlots()
  }

  filter(){

  }
 
  getDiffDays(){
    var current = new Date();     // get current date  
    var curr = new Date();
    var firstday = current.getDate() - current.getDay() +1;  
    var dateIndex = new Date(curr.setDate(firstday)) 
    var _time =  (current.getTime()-dateIndex.getTime())
    return _time / (1000 * 3600 * 24);
  }

  
  addInput(){
    this.lesinputs.push({"heuredebut":"","heurefin":"", "idpatient":0})
  }

  removeInput(i: number){
    this.lesinputs.splice(i,1)
  }

  isDateToday(index: number){
    var current = new Date();     // get current date  
    var curr = new Date();
    var firstday = current.getDate() - current.getDay() +1;  
    var dateIndex = new Date(curr.setDate(firstday+index)) 
    if(current.getDate()==dateIndex.getDate()){
      // this.posSlot=index
      // this.posSlot=index
      return true
    }
    return false
  }

  setPosSlot(i: number){
    this.posSlot=i
  }

  getDateIndex(index: number){
    var curr = new Date();
    var firstday = curr.getDate() - curr.getDay() +1;
    return this.datepipe.transform(new Date(curr.setDate(firstday+index)),'yyyy-MM-dd')   
  }

  addRV(index: number){
    if(this.lesinputs.length>0){
      var dateIndex = this.getDateIndex(index)
      this.http.post<any>(`${this.apiServiceUrl}/rendezvous/add`, {
        "datecreation":dateIndex,
        "description":"description",
        "idmedecin":this.vari.personne.idmedecin,
        "idpatient":0,
        "creneaux":this.lesinputs
      }).subscribe(
        (response: any)=>{
          if(response!=null){
            // this.showSuccess("Reussi","Cr??neaux ajout??s avec succ??s !")
            this.getAllSlots()
          }else{
            // this.showError('Erreur serveur', "Veuillez r??essayer !")
          }
        },(error: HttpErrorResponse)=>{
          // this.showError("Erreur serveur", error.message)
        }
      )
    }else{
      
    }
      // this.showWarning("Impossible","Veuillez choisir un cr??neau horaire !")
  }

  getAllSlots(){
    this.http.get<any>(`${this.apiServiceUrl}/rendezvous/all/`+this.vari.personne.idmedecin+`/`+this.vari.firstdate+`/`+this.vari.lastdate).subscribe(
      (response: any)=>{
        if(response!=null){
          this.allSlots=response
          console.log(this.allSlots)
        }else{
          // this.showError('Erreur serveur', "Veuillez r??essayer !")
        }
      },(error: HttpErrorResponse)=>{
        // this.showError("Erreur serveur", error.message)
      }
    )
  } 

}
