import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesService } from 'src/app/globals/variables.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private vari: VariablesService, private router: Router) { }

  ngOnInit(): void {
    this.vari.posclick=1
    if(this.vari.idpers==0)
      this.router.navigateByUrl("/login")
  }

  
}
