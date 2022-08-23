import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesService } from 'src/app/globals/variables.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public vari: VariablesService, private router: Router) { }

  ngOnInit(): void {
  }

  disconnect(){
    this.vari.idpers=0
    this.router.navigateByUrl("/accueil")
  }


}
