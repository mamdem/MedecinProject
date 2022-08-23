import { Component, OnInit } from '@angular/core';
import { VariablesService } from './globals/variables.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'medecinProject';

  constructor(public vari: VariablesService){}

  ngOnInit(): void {
    this.vari.idpers = Number(sessionStorage.getItem("idpers"))
    this.vari.personne = JSON.parse(sessionStorage.getItem("user"))
  }

}
