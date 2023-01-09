import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  
  allSlotToday = []
  idpers: number=0
  personne: any=null

  firstdate=null
  lastdate=null

  posSlot=0

  posclick=1

  constructor(private datepipe: DatePipe) {
    var curr = new Date; // get current date
    var current = new Date(); // get current date

    var firstday = current.getDate() - current.getDay() +1;    
    this.firstdate = this.datepipe.transform(new Date(curr.setDate(current.getDate() - current.getDay()+1)),'yyyy-MM-dd');    
    this.lastdate = this.datepipe.transform(new Date(curr.setDate(firstday+6)),'yyyy-MM-dd');
  }

  isConnected(){
    return this.personne!=null
  }

}
